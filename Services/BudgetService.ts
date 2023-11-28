import { PrismaClient } from '@prisma/client'
import { BudgetBaseDTO } from '../DTOs/Budget/BudgetBaseDTO'
import { BudgetCreateRequestDTO } from '../DTOs/Budget/Request/BudgetCreateRequestDTO'
import { BudgetUpdateRequestDTO } from '../DTOs/Budget/Request/BudgetUpdateRequestDTO'
const prisma = new PrismaClient()

//지출내역 등록
const createBudget = async (BudgetBaseDTO: BudgetBaseDTO) => {
  const newBudget = await prisma.userSpendings.create({
    data: {
      userId: BudgetBaseDTO.userid,
      groupId: BudgetBaseDTO.groupid,
      spendings: BudgetBaseDTO.spending,
      category: BudgetBaseDTO.category, //모델이 []라서 오류가 생기는 거에용
    },
  })
  //리턴값 어케할지.. showBudget 할지.. 이거 정해야 행
}

//지출내역 보여주기
const showBudget = async (groupId: string) => {
  const Budgets = await prisma.userSpendings.findMany({
    take: 10,
    where: {
      groupId: groupId,
    },
  })
  return Budgets
}
//isDone도 보여지는지 확인해야 하네..

//지출내역 수정
const updateBudgetContent = async (BudgetUpdateRequestDTO: BudgetUpdateRequestDTO) => {
  try {
    const updatedBudget = await prisma.userSpendings.update({
      where: {
        id: BudgetUpdateRequestDTO.budgetId,
      },
      data: {
        spendings: BudgetUpdateRequestDTO.spending,
        category: BudgetUpdateRequestDTO.category,
      },
    })
  } catch (error) {
    throw new Error('Error updating Budget Contents')
  }
}

//지출내역 삭제
const deleteBudget = async (BudgetId: number) => {
  const deletedBudget = await prisma.userSpendings.delete({
    where: {
      id: BudgetId,
    },
  })
  return 0
  //showBudget
}
//showBudget에 따라서 + 이런저런 사정에 따라서 파라미터로 받는게 GroupId가 될 수도 있고 DTO가 될 수도 있구나..
// 그러면 수정 해줘야해...

//지출내역 검색

//지출 합산 내역 반환
const getGroupSpending = async (BudgetId: string, groupId: string) => {
  const GroupSpending = await prisma.userSpendings.groupBy({
    by: ['groupId'],
    _sum: {
      spendings: true,
    },
    _avg: {
      spendings: true,
    },
    where: {
      isDone: false,
    },
  }) //그룹 썸 구하기

  for (const group of GroupSpending) {
    const groupId = group.groupId
    const groupSum = group._sum.spendings
    const groupAvg = group._avg.spendings
   
    let groupMemberSpendings:{userId: string; userSpending: number}[] =[];
    groupMemberSpendings = await getUserSpending(groupId);
  
    groupMemberSpendings.forEach((member)=>{
        if(member.userSpending == null || groupAvg ==null){
            throw new Error('Null Error: getGroupSpending');
        }
        member.userSpending-=groupAvg;
    })
    return groupMemberSpendings;
  }
}

const getUserSpending = async(groupId: string): Promise<{userId:string; userSpending: number}[]>=>{
    const userSpendings = await prisma.userSpendings.groupBy({
        by:['userId'],
        _sum:{
            spendings: true,
        },
        where:{
            groupId: groupId,
            isDone: false,
        },
    });

    const groupMemberSpendings:{userId: string; userSpending: number}[] =[];

    userSpendings.forEach((record)=>{
        const userId = record.userId;
        const userSpending = record._sum.spendings;

        if(userSpending == null){
            throw new Error('Null error: groupMemberSpendings');
        }

        groupMemberSpendings.push({userId, userSpending});
    });

    return groupMemberSpendings;
}



export default {
  createBudget,
  showBudget,
  updateBudgetContent,
  deleteBudget,
  getGroupSpending,
}
