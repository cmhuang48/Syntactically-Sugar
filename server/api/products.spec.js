const { expect } = require('chai')
const request = require('supertest')
const seed = require('../../script/seed');
const { db, models: { Product } } = require('../db')
const app = request(require('../app'))

describe('Product routes', () => {
	beforeEach(async() => {
		await seed();
	})
	describe('Routes', () => {
		describe('/api/products', () => {
		it('GET /api/products', async() => {
			const response = await app.get('/api/products')
			expect(response.status).to.equal(200)
			expect(response.body.length).to.equal(8)
		})
	})

		describe('/api/products/:id', () => {
			it('returns a product', async() => {
				const foo = await Product.findOne({where: { name: 'chocolate'}})
				const res = await app.get(`/api/products/${foo.id}`)
				expect(res.status).to.equal(200)
				expect(res.body.name).to.equal('chocolate')
			})
		})

		describe('POST /api/products', () => {
			it('inserts the product', async() => {
				const foo = await Product.create({
					productId: 1,
					orderId: 1,
					name: 'chocolate',
					quantity: 1
				})
				const res = await app.post('/api/products')
				expect(res.status).to.equal(201)
				})
		})
	})
})