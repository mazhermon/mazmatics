import {
  TESTIMONIAL_DATA,
  ITestimonial,
} from '../../components/testimonials/testimonailsData'
import { Testimonial } from '../../components/testimonials/testimonial'
import styles from './about.module.css'

const About = () => (
  <div className="basicPageContainer longCopyLayoutArea">
    <div className={styles.aboutTextWrapper}>
      <h1>About Mazmatics Fun Math For Kids</h1>
      <p>
        Mazmatics helps you to support the kids in your life with learning at
        home. We create supplementary learning resources to support kids to keep
        practicing what they&apos;re learning in school. If we can help kids to
        develop a healthy attitude towards learning, then they&apos;ll get more
        out of anything they come across. We help kids say &quot;I like
        math&quot;.
      </p>
      <h2>The short story</h2>
      Fun Math 4 Kids is an activity and story book that supports kids to do
      practise their maths and have some fun along the way. Do some maths, do
      some drawing, read a story, solve a code...
      <h2>Look inside</h2>
      <a href="https://shop.mazmatics.com/look-inside">
        Have a look inside Fun Math 4 Kids vol. 1
      </a>{' '}
      But there&apos;s so much more...
      <h2>The long story...</h2>
      <h3>Why should you get this book?</h3>
      Do you want the kids in your life to enjoy math, both now and over their
      lifetime? This book was made to help kids aged 7-10+ say &quot;I like
      Math.&quot; We think that learning to like maths early is a huge step in
      the right direction.
      <p>
        Mazmatics values{' '}
        <strong>fun, inclusion, growth mindset, interleaved learning</strong>{' '}
        and <strong>challenge</strong>. We haven&apos;t included an answers
        page. We think kids need to struggle a little to help them learn deeply.
        (We do sometimes hint strongly at the answers though).
      </p>
      <h3>Space</h3>
      We think kids learning activities need more space so kids can relax in
      between the challenging bits.
      <h3>Getting involved</h3>
      This book has black and white pages. It&apos;s not precious. Kids can have
      fun with it. Draw on this book. Colour in some pictures. Make it yours.
      Rip a page out and stick it on your wall.
      <h3>Good foundations</h3>
      Mazmatics is an activity book and learning resource that helps to make
      math fun and useful for kids and early learners of all ages. It&apos;s
      pitched at US grade 2-4 for kids around 7+, but we think kids and the
      young at heart of all ages will enjoy working on their fundamentals with
      this book. Who doesn&apos;t love a good poop emoji?!
      <p>
        Vol 1 covers{' '}
        <strong>addition, subtraction, multiplication and division</strong>,
        with some fractions included.
      </p>
      <p>
        We all need good fundamentals before we can enjoy the next level of
        ideas and equations. This book is to be used alongside other math
        learning, not to replace it. Kids should listen to their teachers. This
        book gives them more chance to practise what they&apos;re already
        learning.
      </p>
      <p>
        How do you get good at playing the guitar or dancing or sports? You have
        to practise your skills in order to improve. So if you want to get
        better at math and make it something you can enjoy, how are you going to
        get better? You got it.
      </p>
      <p>
        <strong>
          We need to practise our math if we want it to be something we can do
          and enjoy over our lifetime.
        </strong>
      </p>
      <p>
        So what&apos;s going to make practising math seem like a good idea for
        kids?
      </p>
      <p>
        We think that by making things more fun and relatable, kids might
        actually want to practise more and more, especially if we can show how
        math really is useful in daily life, outside of the classroom.
        We&apos;re also thinking that an option to get out the old pencils and
        paper means this book can be used in many situations and brings things
        back to basics, no batteries required.
      </p>
      <p>Mazmatics, for home play, not homework.</p>
      <hr />
      <h2>About the author</h2>
      <p>
        Hi, I&apos;m Maz Hermon, a father of two kids (currently 9 &amp; 5).
        I&apos;m a web developer (computer coder) by day and a creative hobbyist
        by night. I&apos;m not particularly amazing at math, but I do find it
        enjoyable and fascinating and I love to play around with learning of all
        sorts. I quite happily say &quot;I like math&quot;, I&apos;m a big fan.
        I&apos;m not a teacher, but I have a good imagination and like to have
        fun with my learning. I&apos;ve written this book with my kids to offer
        some supplementary learning resources for kids, that can sit alongside
        and support what kids are learning in school. My vision is to help kids
        say &quot;I like math&quot;.
      </p>
      <p>
        My interest in learning math again as an adult was related to using some
        basic trigonometry to calculate trajectories of moving objects while
        programming some game animations with JavaScript. I was delighted to
        have a real use case for it and to see how fun and practical math can be
        in creative projects. I know some kids can get turned off from math at
        an early age and start to disassociate themselves from thinking
        &quot;yeah this is for me too&quot;, so I thought this book might help
        kids to connect with math and maybe even enjoy it. I love learning
        online, but I also like the idea of my kids having access to paper books
        so math can be something we do away from the computer. Both are good.
      </p>
      <p>
        I live in Aotearoa New Zealand with my little family of four and hope
        this book helps some kids of the world to say &quot;I like math&quot;,
        wherever you are.
      </p>
      <p>Have fun</p>
      <p>
        <strong>Maz Hermon</strong>,
        <br />
        creator of Mazmatics
      </p>
      <hr />
      <h2>Customer testimonials</h2>
      <p>
        A Big thanks to everyone who provides feedback. Good or bad, we love
        your feedback. Contact links on mazmatics.com
      </p>
      <h3>
        Feedback from <strong>kids</strong>
      </h3>
      {TESTIMONIAL_DATA.kids.map((testimonial: ITestimonial) => {
        const { person, quote } = testimonial
        return (
          <Testimonial
            key={person.trim().replace(' ', '')}
            person={person}
            quote={quote}
          />
        )
      })}
      <h3>
        Feedback from <strong>adults</strong>
      </h3>
      {TESTIMONIAL_DATA.adults.map((testimonial: ITestimonial) => {
        const { person, quote } = testimonial
        return (
          <Testimonial
            key={person.trim().replace(' ', '')}
            person={person}
            quote={quote}
          />
        )
      })}
      {/* <p className={styles.testimonial}>
        When I picked this up I was immediately drawn to the colloquial language
        and easy to follow format. It&apos;s written the way people speak so
        it&apos;s super easy to relate to. It uses real world examples that are
        relevant and entertaining. This makes math fun! Breath of fresh air.
        Thank you.
        <br />– <span>Rachel Turner</span>
      </p>
      <hr />
      <p className={styles.testimonial}>
        This book is excellent, starting out with kids jokes to gently and
        hilariously introduce simple math. The illustrated story in the book
        contextualises math in a way that kids can relate to. The math gets more
        complex relatively quickly but keeps up the same non pressured
        conversational style, using drawings to clearly break down the
        principles. Great book, would highly recommend.
        <br />– <span>Caro Robertson</span>
      </p>
      <hr />
      <p className={styles.testimonial}>
        Awesome little practice book. It&apos;s full of stories and drawings.
        There&apos;s room to scribble or draw and even some dice you can fold
        and cut out with your kids for math games. Explains the exercises well
        and gives some good tips on how to think about and solve the math
        problems. It&apos;s written in a really fun kid-friendly way- even has
        some encouragement along the way! Really recommend.
        <br />– <span>Paulina</span>
      </p>
      <hr />
      <p className={styles.testimonial}>
        Mazmatics definitely does what it says it will do! I got my nieces and
        nephews all a Mazmatics book for Christmas and they all loved it!
        Perfect for ages 6+, and adults will enjoy it too The hot favourite for
        the kids was the dog poop exercise. This is a brilliant resource for
        kids, it makes math fun for them, which is the best way for little
        brains to learn!
        <br />– <span>Dee Johnston</span>
      </p> */}
    </div>
  </div>
)

export default About
