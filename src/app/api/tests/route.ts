import { TestModel } from '@/src/entities/test/model'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest ) {
  try {
    const body = await request.json() 
    await TestModel.create(body)
    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch  {
    return NextResponse.json({ error: 'Error occurred' }, { status: 500 })
  }
}



export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')
      const categoryId = searchParams.get('categoryId')
      if (id) {
        const test = await TestModel.getById(id)
        return NextResponse.json(test, { status: 200 })
      } else if (categoryId) {
        const tests = await TestModel.getByCategoryId(categoryId)
        return NextResponse.json(tests, { status: 200 })
      } else {
        const tests = await TestModel.getAll()
        return NextResponse.json(tests, { status: 200 })
      }
    } catch (error) {
      console.error('Error fetching tests:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tests' },
        { status: 500 }
      )
    }
  }

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  const test = await TestModel.delete(id)
  return NextResponse.json(test, { status: 200 })
}

