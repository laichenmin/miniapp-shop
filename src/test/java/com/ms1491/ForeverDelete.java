package com.ms1491;
import java.io.File;  
  
/** 
 * 解决无限创建的子文件夹删除不了的问题 
 * @author Treasure 
 * 
 */  
public class ForeverDelete   
{  
    //删除文件夹方法  
    private void deleteDir(File file)   
    {  
        if (file.listFiles().length == 0)  
            file.getAbsoluteFile().delete();  
    }  
    //删除文件方法  
    public void deleteFile(File file)   
    {  
        File[] temp = file.listFiles();  
        for (int i = 0; i < temp.length; i++)   
        {  
            System.out.println(temp[i].getName());  
            if (temp[i].isDirectory())   
            {  
                if (temp[i].listFiles().length != 0)  
                    this.deleteFile(temp[i]); //如果 文件夹里不为空 递归调用 方法  
                    this.deleteDir(temp[i]);  
            }   
            else   
            {  
                temp[i].delete();  
            }  
        }  
    }  
      
    public static void main(String[] args)   
    {  
        ForeverDelete m = new ForeverDelete();  
        m.deleteFile(new File("E:\\gitProject\\vueAdmin-template\\src\\views\\layout\\components"));  
    }  
}  