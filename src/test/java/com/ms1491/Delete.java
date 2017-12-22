package com.ms1491;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

/** * @Author ... * @Date 2017.10.1 * */
public class Delete {
	public static final int MAX_DOT_NUM = 30;
	public static List<File> fileList = new ArrayList<File>();

	public static void main(String[] args) throws IOException {
			System.out.print("开始处理，请耐心等待...");
			long startTime = System.currentTimeMillis();
			int count = delete("E:\\gitProject\\vueAdmin-template\\src\\views\\layout\\components");
			long stopTime = System.currentTimeMillis();
			System.out.print("处理结束，处理文件(或目录)" + count + "个，");
			System.out.println("花费时长:" + ((stopTime - startTime) / 1000) + "秒");
	}

	/**
	 * * 删除指定名称的文件或文件夹（包含其子文件夹和文件） * * @param filename 文件或文件夹名称 * @throws
	 * IOException
	 */
	public static int delete(String filename) throws IOException {
		int count = 0;
		boolean bPlayMovies = true;/* 设为false时关闭删除时的动画; */
		File f = new File(filename);
		
		if (!f.exists()) {
			System.out.println("\r\n指定的文件或文件夹" + f + "不存在!");
			return 0;
		}
		fileList.add(f);
		boolean isplus = false;
		while (fileList.size() > 0) {
			if (bPlayMovies) {
				if (count % MAX_DOT_NUM == 0) {
					isplus = !isplus;
				}
			}
			File tmp = fileList.get(fileList.size() - 1);
			if (tmp.isDirectory()) { /* 处理文件夹 */
				File[] files = tmp.listFiles();
				if (files.length > 0) { /* 如果该文件夹下包含文件或子文件夹 */
					for (File file : files) {
						fileList.add(file);
					}
				} else {
					fileList.remove(fileList.size() - 1);
					tmp.getAbsoluteFile().delete();
					count++;
					if (bPlayMovies) {
						playMovies(isplus);
					}
				}
			} else { /* 处理文件 */
				fileList.remove(fileList.size() - 1);
				tmp.delete();
				count++;
				if (bPlayMovies) {
					playMovies(isplus);
				}
			}
		}
		if (bPlayMovies) {
			playMovies(false);
		}
		System.out.println();
		return count;
	}

	public static void playMovies(boolean isplus) {
		if (isplus) {
			System.out.print(".");
		} else {
			for (int j = MAX_DOT_NUM; j > 0; j--) {
				System.out.print("\b \b");
			}
		}
	}
}