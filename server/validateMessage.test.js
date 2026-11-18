// À run avec npm test
import assert from 'node:assert/strict'
import test from 'node:test'
import { validateMessage } from './validateMessage.js'

// Message correct de base
const valid = {
  name: 'Camille',
  email: 'camille@example.com',
  subject: 'Stage',
  content: 'Bonjour',
}

test('accepte un message complet et enlève les espaces', () => {
  const { message, error } = validateMessage({ ...valid, name: '  Camille  ' })
  assert.equal(error, undefined)
  assert.deepEqual(message, valid)
})

test('refuse un corps absent ou un champ vide', () => {
  assert.ok(validateMessage(undefined).error)
  assert.ok(validateMessage({ ...valid, subject: '   ' }).error)
})

test('refuse un champ qui n’est pas du texte', () => {
  assert.ok(validateMessage({ ...valid, content: { texte: 'Bonjour' } }).error)
})

test('refuse un email invalide', () => {
  assert.ok(validateMessage({ ...valid, email: 'camille@example' }).error)
})

// 100 passe et 101 bloque
test('applique les limites de longueur', () => {
  assert.equal(validateMessage({ ...valid, name: 'a'.repeat(100) }).error, undefined)
  assert.ok(validateMessage({ ...valid, name: 'a'.repeat(101) }).error)
  assert.ok(validateMessage({ ...valid, content: 'a'.repeat(5001) }).error)
})
