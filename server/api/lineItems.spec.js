const { expect } = require('chai')
const request = require('supertest')
const { db, models: { LineItem } } = require('../db')
const seed = require('../../script/seed')
const app = request(require('../app'))

describe('LineItem routes', () => {
	beforeEach(async() => {
		await seed();
	})

	describe('GET /api/lineItems', () => {

		it('GET /api/lineItems', async() => {
			const res = await request(app)
				.get('/api/lineItems')
				.expect(200)

			expect(res.body).to.be.an('array');
			expect(res.body.length).to.equal(3);
		})
	})

	describe('GET /api/lineItems/:id', () => {
		it('returns a lineItem', async() => {
			const foo = await LineItem.findOne({
				where: { 
					quantity: 1
				}
			})

			const res = await request(app)
				.get(`/api/lineItems/${foo.id}`)
				.expect(200)
			
			expect(res.body).to.be.an('object');
			expect(res.body.quantity).to.equal(1);
		})
	})

	describe('POST /api/lineItems', () => {
		it('creates a lineItem', async() => {
			const foo = await LineItem.create({
				quantity: 1
			})

			const res = await request(app)
				.post('/api/lineItems')
				.expect(201)
		})
	})

	describe('DELETE /api/lineItems/:id', () => {
		it('deletes a lineItem', async() => {
				const lineItem = await LineItem.create({
					quantity: 1 
				})

			 	const res = request(app)
					.delete(`/api/lineItems/${lineItem.id}`)
      		.expect(204)
		})
	})
})