import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { NestFactory } from "@nestjs/core"
import { INestApplication } from "@nestjs/common"

describe("app e2e", () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()

  })

  afterAll(async () => {
    await app.close()
  })
  
  it.todo('should pass')
})