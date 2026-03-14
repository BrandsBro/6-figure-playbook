import Navbar        from '@/components/Navbar'
import Hero          from '@/components/Hero'
import Problem       from '@/components/Problem'
import ProfitPath    from '@/components/ProfitPath'
import CartSection   from '@/components/CartSection'
import Checkout      from '@/components/Checkout'
import YesLadder     from '@/components/YesLadder'
import PureProfit    from '@/components/PureProfit'
import Testing       from '@/components/Testing'
import Timeline      from '@/components/Timeline'
import Summary       from '@/components/Summary'
import CTA           from '@/components/CTA'
import Footer        from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <ProfitPath />
        <CartSection />
        <Checkout />
        <YesLadder />
        <PureProfit />
        <Testing />
        <Timeline />
        <Summary />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
