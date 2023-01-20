export interface ITestimonial {
  person: string
  quote: string
}

interface ITestimonialData {
  kids: Array<ITestimonial>
  adults: Array<ITestimonial>
}

export const TESTIMONIAL_DATA: ITestimonialData = {
  kids: [
    {
      person: 'Max C',
      quote:
        'Dear Maz, I loved your book. It makes math more fun! If you are going to make another book add some more of those practice doodling pages and another math story. Keep up the great work! PS. Love the characters! From Max Coulton!!!',
    },
    {
      person: 'Oskar',
      quote:
        "Dear maz/mazmatics Your book was so good and funny I loved it, it was great. I loved the part where you did dot to dot with multiplication questions that made a poop (Hahahahahahahahahahahah.) I also loved the pictures on the working space, especially the evil taco!!!! I learnt a lot, especially a new tactic! The one when you take away the last number and then add the the non taken away number then add the taken away numbers together then add both the answers together and there's your answer. It took me all day to do the whole book!! ( with stops). I loved all the the faces/emojis everywhere, I look for a new ones on each and every page.",
    },
  ],
  adults: [
    {
      person: 'Rachel T',
      quote:
        "When I picked this up I was immediately drawn to the colloquial language and easy to follow format. It's written the way people speak so it's super easy to relate to. It uses real world examples that are relevant and entertaining. This makes math fun! Breath of fresh air. Thank you.",
    },
    {
      person: 'Caro R',
      quote:
        'This book is excellent, starting out with kids jokes to gently and hilariously introduce simple math. The illustrated story in the book contextualises math in a way that kids can relate to. The math gets more complex relatively quickly but keeps up the same non pressured conversational style, using drawings to clearly break down the principles. Great book, would highly recommend.',
    },
    {
      person: 'Paulina',
      quote:
        "Awesome little practice book. It's full of stories and drawings. There's room to scribble or draw and even some dice you can fold and cut out with your kids for math games. Explains the exercises well and gives some good tips on how to think about and solve the math problems. It's written in a really fun kid-friendly way- even has some encouragement along the way! Really recommend.",
    },
    {
      person: 'Dee J',
      quote:
        'Mazmatics definitely does what it says it will do! I got my nieces and nephews all a Mazmatics book for Christmas and they all loved it! Perfect for ages 6+, and adults will enjoy it too The hot favourite for the kids was the dog poop exercise. This is a brilliant resource for kids, it makes math fun for them, which is the best way for little brains to learn!',
    },
  ],
}
