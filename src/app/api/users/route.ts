import { UserModel } from "@/src/entities/user/model"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')
      if (id) {
        const test = await UserModel.getById(id)
        return NextResponse.json(test, { status: 200 })
      } else {
        const tests = await UserModel.getAll()
        return NextResponse.json(tests, { status: 200 })
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      )
    }
  }

export async function PUT(request: NextRequest ) {
  try {
    const body = await request.json() 
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    await UserModel.updateById({id,...body})
    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch  {
    return NextResponse.json({ error: 'Error occurred' }, { status: 500 })
  }
}
  