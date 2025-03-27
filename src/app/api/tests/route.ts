import { TestModel } from '@/src/entities/test/model'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest ) {
  try {
    const body = await request.json() 

    const test = await TestModel.create(body)
    return NextResponse.json(test, { status: 201 })
  } catch (error) {
    return    error
  }
}



export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')
  
      if (id) {
        const test = await TestModel.getById(id)
        return NextResponse.json(test, { status: 200 })
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

