package com.ms1491.dynamicdatasource;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DataSourceAspect implements Ordered{
	
    private static final Logger logger = LoggerFactory.getLogger(DataSourceAspect.class);

//	@Around("execution(* com.ms1491.modules.appuser.dao..*.*(..)) or execution(* com.ms1491.modules.shop.dao..*.*(..))")
//    public Object proceed1(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
//    	try {
//            logger.info("set database connection to SECOND");
//            DynamicDataSource.setDataSource(DataSourceContext.SECOND.getName());
//            Object result = proceedingJoinPoint.proceed();
//            return result;
//        } finally {
//        	DynamicDataSource.clearDataSource();
//        	logger.info("restore database connection");
//        }
//    }
	
//	@Around("execution(* com.ms1491.modules.*.dao..*.query*(..)) or execution(* com.ms1491.modules.*.dao..*.get*(..))")
//    public Object proceed2(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
//        try {
//            logger.info("set database connection to read second");
//            DynamicDataSource.setDataSource(DataSourceContext.SECOND.getName());
//            Object result = proceedingJoinPoint.proceed();
//            return result;
//        } finally {
//        	DynamicDataSource.clearDataSource();
//            logger.info("restore database connection");
//        }
//    }

	@Override
	public int getOrder() {
		return 0;
	}
}