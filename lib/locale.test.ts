import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { storefrontFor, shippingCopyFor, isHighConfidenceLocale } from './locale'

test('en-US → amazon.com US storefront', () => {
  assert.equal(storefrontFor('en-US').region, 'US')
  assert.equal(storefrontFor('en-US').url, 'https://www.amazon.com/dp/0473648911')
})

test('en-GB → amazon.co.uk UK storefront', () => {
  assert.equal(storefrontFor('en-GB').region, 'UK')
  assert.equal(storefrontFor('en-GB').url, 'https://www.amazon.co.uk/dp/0473648911')
})

test('en-AU → amazon.com.au AU storefront', () => {
  assert.equal(storefrontFor('en-AU').region, 'AU')
  assert.equal(storefrontFor('en-AU').url, 'https://www.amazon.com.au/dp/0473648911')
})

test('en-NZ → amazon.com.au AU storefront (NZ ships from AU)', () => {
  assert.equal(storefrontFor('en-NZ').region, 'AU')
  assert.equal(storefrontFor('en-NZ').url, 'https://www.amazon.com.au/dp/0473648911')
})

test('unknown locale falls back to US', () => {
  assert.equal(storefrontFor('fr-CA').region, 'US')
  assert.equal(storefrontFor('').region, 'US')
  assert.equal(storefrontFor(undefined).region, 'US')
})

test('shipping copy for known locales', () => {
  assert.equal(shippingCopyFor('en-NZ'), 'ships to Aotearoa NZ from Australia')
  assert.equal(shippingCopyFor('en-AU'), 'ships within Australia')
  assert.equal(shippingCopyFor('en-US'), 'Prime eligible')
  assert.equal(shippingCopyFor('en-GB'), 'ships within the UK')
})

test('shipping copy is null for unknown locales', () => {
  assert.equal(shippingCopyFor('fr-CA'), null)
  assert.equal(shippingCopyFor(''), null)
  assert.equal(shippingCopyFor(undefined), null)
})

test('isHighConfidenceLocale recognises the four canonical locales', () => {
  assert.equal(isHighConfidenceLocale('en-NZ'), true)
  assert.equal(isHighConfidenceLocale('en-AU'), true)
  assert.equal(isHighConfidenceLocale('en-US'), true)
  assert.equal(isHighConfidenceLocale('en-GB'), true)
  assert.equal(isHighConfidenceLocale('fr-CA'), false)
  assert.equal(isHighConfidenceLocale(''), false)
})
