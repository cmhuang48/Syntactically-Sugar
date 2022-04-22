const { expect } = require('chai')
const request = require('supertest')
const seed = require('../../script/seed');
const { db, models: { Product } } = require('../db')
const app = request(require('../app'))

describe('Product routes', () => {
	beforeEach(async() => {
		await seed();
	})

	describe('GET /api/products', () => {
		it('GET /api/products', async() => {
			const response = await app.get('/api/products')
			expect(response.status).to.equal(200)
			expect(response.body.length).to.equal(8)
		})
	})

	describe('GET /api/products/:id', () => {
		it('returns a product', async() => {
			const foo = await Product.findOne({where: { name: 'chocolate'}})
			const res = await app.get(`/api/products/${foo.id}`)
			expect(res.status).to.equal(200)
			expect(res.body.name).to.equal('chocolate')
		})
	})
})