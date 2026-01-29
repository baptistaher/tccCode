import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { HttpError } from "../../models/http-error";

// not done

export class UpdatePersonalTrainerInfoControllers {
	async handle(request: Request, response: Response, next: NextFunction) {
		const { name, email, phone } = request.body;
		const personalTrainerId = request.params.id;

		let personalTrainer;

		try {
			personalTrainer = await prismaClient.personalTrainer.findUnique({
				where: {
					id: personalTrainerId,
				},
			});
		} catch (e) {
			const error = new HttpError(
				"Something went wrong, couldn't  get PersonalTrainer",
				500,
			);
			return next(error);
		}

		try {
		} catch (e) {
			const error = new HttpError(
				"Something went wrong, couldn't find User Id",
				500,
			);
			return next(error);
		}
	}
}

// import {Request,Response,NextFunction} from 'express';
// import { prismaClient } from '../../database/prismaClient';
// import { HttpError } from '../../models/http-error';

// //Testing ideias

// export const UpdatePersonalTrainerControllers =async ( request: Request, response: Response, next: NextFunction) =>{

//   const { email, phone} = request.body;
//   const personalTrainerId = request.params.id;

//   let personalTrainer;
//   try{
//     personalTrainer = await prismaClient.personalTrainer.findUnique(
//       {
//         where:
//         {
//           id: personalTrainerId
//         }
//       }
//     )
//   } catch(err){
//     const error = new HttpError("Something went wrong, could not getPersonalTrainer id", 500);
//     return next(error);
//   }

//   try{
//     const updatedPersonalTrainer = await prismaClient.personalTrainer.update(
//       {
//         where: {
//           id: personalTrainer?.id
//         },
//         data: {
//           email: email,
//           phone: phone
//         }
//       }
//     )

//   }catch(e){
//     const error = new HttpError("", 500);
//   }

// }
