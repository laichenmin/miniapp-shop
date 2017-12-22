$(function () {
//	var ue1  = UE.getEditor('courseIntroduction');
//	var ue2 = UE.getEditor('contentReview');
	
    $("#jqGrid").jqGrid({
        url: baseURL + 'college/course/list',
        datatype: "json",
        colModel: [			
			{ label: 'courseId', name: 'courseId', index: 'course_id', width: 50, hidden:true, key: true },
			{ label: '名称', name: 'name', index: 'name', width: 80 }, 
			{ label: '所属课程', name: 'collegeName', index: 'college_name', width: 80 }, 			
			{ label: '开课时间', name: 'startTime', index: 'start_time', width: 80 }, 			
			{ label: '地点', name: 'place', index: 'place', width: 80 }, 			
			{ label: '讲师', name: 'leaderName', index: 'leader_name', width: 80 }, 	
			{ label: '课程细节', name: 'courseIntroduction', index: 'course_introduction', width: 80 ,formatter: function(value, options, row){
				return value == null ? '未添加' : '<a href="'+value+'" target="view_window">'+value+'</a>';
			}}, 
			{ label: '状态', name: 'status', width: 80, formatter: function(value, options, row){
				return value === 0 ? 
					'<span class="label label-danger">等待开课</span>' : 
					'<span class="label label-success">已完成</span>';
			}},
			{ label: '报名人数', name: 'signupNumber', width: 80, formatter: function(value, options, row){
				return '<span class="label label-success">'+value+'人</span>';
			}},
			{ label: '封面图片', name: 'coverImg', index: 'cover_img', width: 80 ,formatter: function(value, options, row){
				return value == null ? '未添加' : '<a href="'+value+'" target="view_window">'+value+'</a>';
			}}, 
			{ label: '精彩回顾', name: 'contentReview', index: 'contentReview', width: 80 ,formatter: function(value, options, row){
				return value == null ? '未添加' : '<a href="'+value+'" target="view_window">'+value+'</a>';
			}}, 			
			{ label: '视频回顾', name: 'videoReview', hidden:true, index: 'video_review', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
    
//    vm.initDatepicker();
    vm.getCollege();
    vm.initUpload();
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			name: null
		},
		showList: true,
		title: null,
		course: {
			startTime:null,
			endTime:null
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.course = {};
		},
		update: function (event) {
			var courseId = getSelectedRow();
			if(courseId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(courseId)
		},
		saveOrUpdate: function (event) {
			var url = vm.course.courseId == null ? "college/course/save" : "college/course/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.course),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var courseIds = getSelectedRows();
			if(courseIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"college/course/delete",
				    contentType: "application/json",
				    data: JSON.stringify(courseIds),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		finish: function(event){
			var courseIds = getSelectedRows();
			if(courseIds == null){
				return ;
			}
			confirm('确定要结束选中的课程？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"college/course/finish",
				    contentType: "application/json",
				    data: JSON.stringify(courseIds),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(courseId){
			$.get(baseURL +"college/course/info/"+courseId, function(r){
                vm.course = r.course;
//                UE.getEditor('courseIntroduction').setContent(vm.course.courseIntroduction);
//                UE.getEditor('contentReview').setContent(vm.course.contentReview);
            });
		},
       getCollege: function () {            
    	   //加载课程
           $.get(baseURL + "college/college/listAll", function(r){
        	   for ( var i = 0; i < r.length; i++) {
        		   $("#collegeId").append("<option value='"+r[i].collegeId+"'>"+r[i].title+"</option>");
        	   }
        	   
           })
        },
        initUpload: function(){
        	
        	
        	
        	
//            new AjaxUpload('#upload', {
//                action: baseURL + 'sys/oss/upload?token=' + token,
//                name: 'file',
//                autoSubmit:true,
//                responseType:"json",
//                onSubmit:function(file, extension){
//                    if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))){
//                        alert('只支持jpg、png、gif格式的图片！');
//                        return false;
//                    }
//                },
//                onComplete : function(file, r){
//                    if(r.code == 0){
//                    	$("#coverImg").val(r.url);
//                    	vm.course.coverImg = r.url;
//                        alert("上传成功");
//                    }else{
//                        alert(r.msg);
//                    }
//                }
//            }); 
        },
        
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
				postData:{'name': vm.q.name},
                page:page
            }).trigger("reloadGrid");
		}
	}
});