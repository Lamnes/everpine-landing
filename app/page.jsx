import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Proof from '../components/Proof'
import Shot from '../components/Shot'
import Cta from '../components/Cta'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import s from './page.module.css'

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Proof />

        {/* POS: кадр во всю ширину с выноской. */}
        <section className="section" id="product">
          <div className="wrap">
            <p className="eyebrow">Where the loop starts</p>
            <h2>The check is the source of truth.</h2>
            <p className="body">
              Every table, every open tab, every settled check. Nothing is typed twice, because
              the rest of the loop reads from here.
            </p>
            <Shot
              src="/assets/pos.png" mobileSrc="/assets/pos-m.png" width={2176} height={580}
              alt="Restaurant floor plan in Everpine POS, showing occupied tables with their open check totals."
              link={{ x: 87, y: 46, toX: 80, toY: 84 }}
              callout={<>Table T-08 sits at <b>$286</b> open. The moment it settles, stock moves.</>}
            />
          </div>
        </section>

        {/* Inventory: таблице нужна вся ширина, иначе цифры нечитаемы. */}
        <section className="section">
          <div className="wrap">
            <h2>Stock that orders itself.</h2>
            <p className="body">
              Recipes turn each sold dish into ingredients deducted from the shelf. When an item
              crosses its minimum, the order is already drafted with the supplier and the amount.
              A person still presses the button. The system does the counting.
            </p>
            <Shot
              src="/assets/inventory.png" mobileSrc="/assets/inventory-m.png" width={2176} height={600}
              alt="Auto-reorder table listing ingredients below minimum with the quantity to order, the supplier and the cost."
            />
          </div>
        </section>

        {/* Money: карточка вертикальная, поэтому здесь узкая колонка и текст рядом. */}
        <section className="section">
          <div className={`wrap ${s.split} ${s.mirror}`}>
            <div className={s.text}>
              <h2>One payment, every supplier paid.</h2>
              <p className="body">
                A restocking order can touch several suppliers. The operator authorises one amount
                and settlement splits it, each share landing in its own account with its own reference.
              </p>
              <p className="body">
                This is the part nobody else does. It is why the loop closes instead of ending
                in a spreadsheet.
              </p>
            </div>
            <Shot
              src="/assets/money.png" width={1004} height={1032} className="portrait"
              alt="Vela supplier payout: an $11,400 payment splitting into $6,840 and $4,560 across two supplier accounts."
            />
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
      <Reveal />
    </>
  )
}
