import React from 'react'

import styles from './testimonialList.module.css'

import { TESTIMONIAL_DATA, ITestimonial } from './testimonailsData'
import { Testimonial } from './testimonial'

import { Lines } from '../patterns/Lines'

export const TestimonialList = () => {
  return (
    <div className={styles.testimonialList}>
      <div className={styles.decorativeWrapper}>
        <Lines />
      </div>
      <h2 className={styles.customerTestimonialsTitle}>
        Customer testimonials
      </h2>
      <p className={styles.customerTestimonialsIntro}>
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
    </div>
  )
}
