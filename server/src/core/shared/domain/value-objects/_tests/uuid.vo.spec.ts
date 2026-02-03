import { InvalidUuidError, Uuid } from "../uuid.vo"



describe("Uuid unit Test",()=>{

  const validateSpy = jest.spyOn(Uuid.prototype as any,"validate")

  test("should throw error when uuid is invalid",()=>{
    expect(()=> new Uuid("invalid-uuid")).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test("should create a valid uuid",()=>{})

  test("should accept a valid uuid",()=>{})
})