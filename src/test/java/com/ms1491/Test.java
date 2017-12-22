package com.ms1491;

import java.util.Random;
import java.util.TreeSet;


public class Test {

	//从1亿个数字中取出最大的100个.
	public static void main(String[] args) {
		long startTime=System.currentTimeMillis();   //获取开始时间  
		int numberCount = 100;
		Random random = new Random();
		TreeSet<Integer> top100Tree = new TreeSet<Integer>();
		for(int i = 0; i < numberCount; ++i){
			int currentNum = random.nextInt(numberCount);
			if(top100Tree.size()>10){
				if(top100Tree.last()>currentNum){
					String numbers = "";
					for (Integer number : top100Tree) {
						numbers +="," + number;
					}
					System.out.println(numbers);
					
					System.out.println("first=============="+top100Tree.first());
					System.out.println("current=============="+currentNum);
					System.out.println("last=============="+top100Tree.last());
					System.out.println("last=============="+top100Tree.pollLast());
					
					top100Tree.add(currentNum);
				}
			}else{
				top100Tree.add(currentNum);
			}
		}
		System.out.println("first=============="+top100Tree.first());
		
		String numbers = "";
		for (Integer number : top100Tree) {
			numbers +="," + number;
		}
		System.out.println(numbers);
		
		long endTime=System.currentTimeMillis(); //获取结束时间  
		
		System.out.println("程序运行时间： "+(endTime-startTime)+"ms"); 
		
		System.out.println("last=============="+top100Tree.last());
//		for (int i = 0; i < numberCount; ++i) {
//			inputArray[i] = Math.abs(random.nextInt(maxNumber));
//		}
		
		
		

	}
}
