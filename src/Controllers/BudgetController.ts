import { NextFunction, Request, Response } from 'express'
import { validationResult, Result, ValidationError } from 'express-validator'
import * as BudgetService from '../Services/Budget/BudgetService'
import { BudgetCreateRequestDto } from '../DTOs/Budget/Request/BudgetCreateRequestDto'
import * as GroupServiceUtils from '../Services/Group/GroupServiceUtils'

/*
get
/:groupId
/budget
*/

const showBudget = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);

  try {
    const data = await BudgetService.showBudget(groupId)

    return res.send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error Fetching Budget Data: Controller' })
  }
}

/*
  get
  /:groupId
  /budget
  서치
*/

const getBudgetSearch = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);
  const searchKey: string = req.params.searchKey

  try {
    const data = await BudgetService.searchBudget(groupId, searchKey)

    return res.send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error Searching Budget: Controller' })
  }
}


/*
get
카테고리별 검색
*/


const getBudgetSearchByCategory = async(req: Request, res: Response, next: NextFunction)=>{
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);
  const category: string = req.params.category;

  try {
    const data = await BudgetService.showByCategory(groupId, category);

    return res.send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error Searching Budget by Category: Controller' })
  }
}


// /*
// get
// 정산
// */
const getFinalAdjustment = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);
  
  try {
    const data = await BudgetService.finalAdjustment(groupId);

    return res.send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error getting FinalAdjustment: Controller' })
  }
}

const getAdjforBudget = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);
  
  try {
    const data = await BudgetService.AdjAtBudget(groupId);

    return res.send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error getting AdjforBudget: Controller' })
  }
}

/*
post
/budget
*/
const createBudget = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);
  const BudgetCreateRequestDto: BudgetCreateRequestDto = req.body

  try {
    const data = await BudgetService.createBudget(userId, groupId, BudgetCreateRequestDto)

    return res.send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error Creating Budget: Controller' })
  }
}

/*
delete
/budget
*/

const deleteBudget = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const StrbudgetId = req.params.budgetId
  const budgetId = parseInt(StrbudgetId)
  try {
    await BudgetService.deleteBudget(budgetId)
    res.status(200).send()
  } catch (error) {
    res.status(500).json({ error: 'Error Deleting Budget: Controller' })
  }
}

/*
updateBudget
/budget/:budgetId
*/
const updateBudget = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId)
  const StrbudgetId = req.params.budgetId
  const budgetId = parseInt(StrbudgetId)
  const BudgetUpdateRequestDto = req.body

  try {
    const data = await BudgetService.updateBudget(budgetId, groupId, BudgetUpdateRequestDto)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error Updating Budget Content: Controller' })
  }
}

const doneBudget = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);

  try {
    const data = await BudgetService.isDone(groupId)
    console.log(data)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error Updating Budget Content: Controller' })
  }
}

/*
createNewSubCategory
/budget
*/
const createsubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);
  const subCategoryName = req.body.name
  const StrcategoryId = req.params.categoryId
  const categoryId = parseInt(StrcategoryId)

  try {
    const data = await BudgetService.createSubCategory(groupId, categoryId, subCategoryName)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error Updating Budget Content: Controller' })
  }
}

/*
showSubCategory
*/

const showSubCategories = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const userId = req.body.user.id;
  const groupId = await GroupServiceUtils.findGroupIdByUserId(userId);
  const categoryName = req.params.categoryName

  try {
    const data = await BudgetService.showSubCategory(groupId, categoryName)

    return res.send(data)
  } catch (error) {
    res.status(500).json({ error: 'Error Fetching SubCategory Data: Controller' })
  }
}

export { createsubCategory, 
  updateBudget,
  doneBudget, 
  deleteBudget, 
  createBudget, 
  getBudgetSearch,
   showBudget, 
   showSubCategories,
    getFinalAdjustment, 
    getAdjforBudget, 
    getBudgetSearchByCategory 
}
