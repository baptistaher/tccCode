import { Router } from "express";
// import { GetAllDiscountsController } from './../../controllers/Discount/GetAllDiscountController'
// import { CreateDiscountController } from '../../controllers/Discount/CreateDiscountController'
// import { GetDiscountByIdController } from '../../controllers/Discount/GetDiscountByIdController'
import { CreateEmployeeController } from "../../controllers/Employee/CreateEmployeeController";
import { GetAllEmployeesController } from "../../controllers/Employee/GetAllEmployeesController";
import { GetEmployeeByIdController } from "../../controllers/Employee/GetEmployeeByIdController";
import { UpdateEmployeePhoneNumBerController } from "../../controllers/Employee/UpdateEmployeePhoneNumberController";

const employeeRoutes = Router();

const createEmployee = new CreateEmployeeController();
const getAllEmployees = new GetAllEmployeesController();
const getEmployeeById = new GetEmployeeByIdController();
const updateEmployeePhoneNumber = new UpdateEmployeePhoneNumBerController();

// const createDiscount = new CreateDiscountController()
// const getAllDiscounts = new GetAllDiscountsController()
// const getDiscountById = new GetDiscountByIdController()

employeeRoutes.post("/", createEmployee.handle);
employeeRoutes.get("/", getAllEmployees.handle);
employeeRoutes.get("/:id", getEmployeeById.handle);
employeeRoutes.patch("/:id", updateEmployeePhoneNumber.handle);

export { employeeRoutes };
