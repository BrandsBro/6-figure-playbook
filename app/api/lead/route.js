import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, website, revenueRange } = body

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([{
        first_name:     firstName,
        last_name:      lastName,
        email:          email.toLowerCase().trim(),
        website:        website || null,
        revenue_range:  revenueRange || null,
        source:         'playbook_download',
        created_at:     new Date().toISOString(),
      }])
      .select()

    if (error) {
      // Duplicate email — not a crash, just skip
      if (error.code === '23505') {
        return NextResponse.json({ success: true, duplicate: true })
      }
      throw error
    }

    return NextResponse.json({ success: true, lead: data[0] })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ leads: data })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}