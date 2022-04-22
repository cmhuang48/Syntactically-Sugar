const { expect } = require('chai');
const request = require('supertest')
const seed = require('../../script/seed');
const { db, models: { LineItem } } = require('../db')
const app = request(require('../app'))

describe('LineItem routes', () => {
	beforeEach(async() => {
		await seed();
	})

	describe('GET /api/lineItems', () => {
		it('GET /api/lineItems', async() => {
			const response = await app.get('/api/lineItems')
			expect(response.status).to.equal(200)
			expect(response.body.length).to.equal(3)
		})
	})

	describe('GET /api/lineItems/:id', () => {
		it('returns a lineItem', async() => {
			const foo = await LineItem.findOne({where: { quantity: 1}})
			const res = await app.get(`/api/lineItems/${foo.id}`)
			expect(res.status).to.equal(200)
			expect(res.body.quantity).to.equal(1)
		})
	})

	describe('POST /api/lineItems', () => {
		it('inserts the lineItem', async() => {
			const foo = await LineItem.create({
				quantity: 1
			})
			const res = await app.post('/api/lineItems')
			expect(res.status).to.equal(201)
		})
	})

	describe('DELETE /api/lineItems/:id', () => {
		it('response with 404 if the place does not exist', async() => {
				const lineItem = await LineItem.create({quantity:1})
			 	const res = await app.delete(`/api/lineItems/${lineItem.id}`);
        expect(res.status).to.equal(204);
		})
	})
})