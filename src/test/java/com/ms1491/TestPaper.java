package com.ms1491;

public class TestPaper {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		//EPS(每股收益) = N(净利率) x T(总资产周转率) x P(每股净值) x E(权益系数)
		
		//股价 = 市盈率 x EPS = PE(市盈率) x N(净利率) x T(总资产周转率) x P(每股净值) x E(权益系数) 
		
		
		//
		double n = 0.19;//净利率
		
		double t = 0.6;//总资产周转率
		
		double p = 7.19;//每股净值  = 股东权益÷股本总额
		
		double e = 1/0.6;//权益系数
		
		double eps = n * t * p * e;
		
		
		System.out.println("eps="+eps);
		
		System.out.println("10市盈率="+eps*10);
		System.out.println("20市盈率="+eps*20);
		System.out.println("20市盈率买入="+eps*20*0.8);
		System.out.println("25市盈率="+eps*25);
		System.out.println("30市盈率="+eps*30);
		
		
		
		
		
		
	}

}
