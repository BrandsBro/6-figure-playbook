import { supabase } from '../../lib/supabase.js'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { event, page, metadata } = body

    if (!event) {
      return NextResponse.json({ error: 'Event name required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('analytics')
      .insert([{
        event,                          // e.g. 'page_view', 'cta_click', 'lead_form_start'
        page:       page || '/',
        metadata:   metadata || {},
        created_at: new Date().toISOString(),
      }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Analytics API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const event = searchParams.get('event')

    let query = supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)

    if (event) query = query.eq('event', event)

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ events: data })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}