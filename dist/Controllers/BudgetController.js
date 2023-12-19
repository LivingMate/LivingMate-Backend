"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBudget = exports.getBudgetSearch = exports.createBudget = exports.deleteBudget = exports.updateBudget = exports.updateBudgetCategory = void 0;
const BudgetService = __importStar(require("../Services/BudgetService"));
/*
get
/:groupId
/budget
*/
const showBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.groupId;
    try {
        const data = yield BudgetService.showBudget(groupId);
        return res
            .send(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error Fetching Budget Data: Controller' });
    }
});
exports.showBudget = showBudget;
/*
  get
  /:groupId
  /budget
  서치
*/
const getBudgetSearch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.groupId;
    const searchKey = req.body.data;
    try {
        const data = yield BudgetService.searchBudget(groupId, searchKey);
        return res
            .send(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error Searching Budget: Controller' });
    }
});
exports.getBudgetSearch = getBudgetSearch;
/*
get
정산
*/
/*
post
/budget
*/
const createBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.groupId;
    const BudgetBaseDTO = req.body.data;
    try {
        const data = yield BudgetService.createBudget(BudgetBaseDTO, groupId);
        return res
            .send(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error Creating Budget: Controller' });
    }
});
exports.createBudget = createBudget;
/*
delete
/feed
*/
const deleteBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const budgetId = req.body.data;
    try {
        yield BudgetService.deleteBudget(budgetId);
        res.status(200).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error Deleting Budget: Controller' });
    }
});
exports.deleteBudget = deleteBudget;
/*
updateBudget
/budget/:budgetId
*/
const updateBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const budgetId = req.params.budgetId;
    const BudgetUpdateRequestDto = req.body.data;
    try {
        yield BudgetService.updateBudgetContent(budgetId, BudgetUpdateRequestDto);
        res.status(200).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error Updating Budget Content: Controller' });
    }
});
exports.updateBudget = updateBudget;
/*
updateNewCategory
/budget
*/
const updateBudgetCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.groupId;
    const subCategoryName = req.body.data;
    try {
        yield BudgetService.updateNewSubCategory(groupId, subCategoryName);
        res.status(200).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error Updating Budget Content: Controller' });
    }
});
exports.updateBudgetCategory = updateBudgetCategory;
//# sourceMappingURL=BudgetController.js.map