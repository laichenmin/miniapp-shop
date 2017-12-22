package com.ms1491;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

import org.mockito.cglib.proxy.Enhancer;
import org.mockito.cglib.proxy.MethodInterceptor;
import org.mockito.cglib.proxy.MethodProxy;

public class TestProxy {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		BirdCglib birdCglib = new BirdCglib();
		BigBird bigBirdProxy = (BigBird) birdCglib.getInstance(new BigBird());
		bigBirdProxy.print("111111111");
		
	}
}

interface Bird{
	public void print(String msg);
	
}
class BigBird {
	public void print(String msg) {
		System.out.println("I am bigBird:"+msg);
	}
	
}
class SmallBird implements Bird{
	@Override
	public void print(String msg) {
		System.out.println("I am smallBird:"+msg);
	}
	
}
class BirdProxy implements InvocationHandler {
    private Object target;  
    /** 
     * 绑定委托对象并返回一个代理类 
     * @param target 
     * @return 
     */  
    public Object bind(Object target) {  
        this.target = target;  
        //取得代理对象  
        return Proxy.newProxyInstance(target.getClass().getClassLoader(),  
                target.getClass().getInterfaces(), this);   //要绑定接口(这是一个缺陷，cglib弥补了这一缺陷)  
    }  
	@Override
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		
        Object result=null;  
        System.out.println("事物开始");  
        //执行方法  
        result=method.invoke(target, args); 
        
        System.out.println("事物结束");  
        return result; 
		
	}
}
class BirdCglib implements MethodInterceptor {  
    private Object target;  
  
    /** 
     * 创建代理对象 
     *  
     * @param target 
     * @return 
     */  
    public Object getInstance(Object target) {  
        this.target = target;  
        Enhancer enhancer = new Enhancer();  
        enhancer.setSuperclass(this.target.getClass());  
        // 回调方法  
        enhancer.setCallback(this);  
        // 创建代理对象  
        return enhancer.create();  
    }  
  
    @Override  
    public Object intercept(Object obj, Method method, Object[] args,  
            MethodProxy proxy) throws Throwable {  
        System.out.println("事物开始");  
        proxy.invokeSuper(obj, args);  
        System.out.println("事物结束");  
        return null;  
  
  
    }  
  
}  


