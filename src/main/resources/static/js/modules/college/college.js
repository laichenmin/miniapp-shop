$(function () {
//	var ue1  = UE.getEditor('collegeIntroduction');
//	var ue2 = UE.getEditor('leaderIntroduction');
//	var ue3 = UE.getEditor('courseSystem');
	
    $("#jqGrid").jqGrid({
        url: baseURL + 'college/college/list',
        datatype: "json",
        colModel: [			
			{ label: 'collegeId', name: 'collegeId', index: 'college_id', width: 50, key: true ,hidden:true},
			{ label: '课程标题', name: 'title', index: 'title', width: 80 }, 	
			{ label: '背景颜色（color）', name: 'color', index: 'color', width: 80 }, 	
			{ label: '课程介绍', name: 'collegeIntroduction', index: 'college_introduction', width: 80  ,formatter: function(value, options, row){
				return value == null ? '' : '<a href="'+value+'" target="view_window">'+value+'</a>';
			}}, 			
			{ label: '讲师介绍', name: 'leaderIntroduction', index: 'leader_introduction', width: 80 ,formatter: function(value, options, row){
				return value == null ? '' : '<a href="'+value+'" target="view_window">'+value+'</a>';
			}}, 						
			{ label: '课程体系', name: 'courseSystem', index: 'course_system', width: 80,formatter: function(value, options, row){
				return value == null ? '' : '<a href="'+value+'" target="view_window">'+value+'</a>';
			}}, 					
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
    
    
    new AjaxUpload('#upload', {
        action: baseURL + 'sys/oss/upload?token=' + token,
        name: 'file',
        autoSubmit:true,
        responseType:"json",
        onSubmit:function(file, extension){
            if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))){
                alert('只支持jpg、png、gif格式的图片！');
                return false;
            }
        },
        onComplete : function(file, r){
            if(r.code == 0){
            	$("#icon").val(r.url);
            	vm.college.icon = r.url;
                alert("上传成功");
            }else{
                alert(r.msg);
            }
        }
    });    
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		college: {
			icon:null
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.college = {};
		},
		update: function (event) {
			var collegeId = getSelectedRow();
			if(collegeId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(collegeId)
		},
		saveOrUpdate: function (event) {
			var url = vm.college.collegeId == null ? "college/college/save" : "college/college/update";
//            vm.college.collegeIntroduction = UE.getEditor('collegeIntroduction').getContent();
//            vm.college.leaderIntroduction = UE.getEditor('leaderIntroduction').getContent();
//            vm.college.courseSystem = UE.getEditor('courseSystem').getContent();
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.college),
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
			var collegeIds = getSelectedRows();
			if(collegeIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"college/college/delete",
				    contentType: "application/json",
				    data: JSON.stringify(collegeIds),
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
		getInfo: function(collegeId){
			$.get(baseURL +"college/college/info/"+collegeId, function(r){
                vm.college = r.college;
                
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});