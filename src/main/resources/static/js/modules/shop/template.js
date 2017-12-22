$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'shop/template/list',
        datatype: "json",
        colModel: [			
			{ label: 'templateId', name: 'templateId', index: 'template_id',hidden:true, width: 50, key: true },
			{ label: '模板名称', name: 'name', index: 'name', width: 80 }, 
			{ label: '模板标识', name: 'code', index: 'code', width: 80 }, 
			{ label: '模型', name: 'model', index: 'model', width: 80 ,formatter: function(value, options, row){
				return value == null ? '未添加' : '<a href="'+value+'" target="view_window">'+value+'</a>';
			}}, 			
			{ label: '图片', name: 'picture', index: 'picture', width: 80 ,formatter: function(value, options, row){
				return value == null ? '未添加' : '<a href="'+value+'" target="view_window">'+value+'</a>';
			}}, 
			{ label: '状态', name: 'delete', width: 80, formatter: function(value, options, row){
				return value === 1 ? 
					'<span class="label label-danger">禁用</span>' : 
					'<span class="label label-success">启用</span>';
			}},		
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
    vm.initUpload();
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		template: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.template = {};
		},
		update: function (event) {
			var templateId = getSelectedRow();
			if(templateId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(templateId)
		},
		saveOrUpdate: function (event) {
			var url = vm.template.templateId == null ? "shop/template/save" : "shop/template/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.template),
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
			var templateIds = getSelectedRows();
			if(templateIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"shop/template/delete",
				    contentType: "application/json",
				    data: JSON.stringify(templateIds),
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
		getInfo: function(templateId){
			$.get(baseURL +"shop/template/info/"+templateId, function(r){
                vm.template = r.template;
            });
		},
        initUpload: function(){
            new AjaxUpload('#uploadModel', {
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
                    	$("#model").val(r.url);
                    	vm.template.model = r.url;
                        alert("上传成功");
                    }else{
                        alert(r.msg);
                    }
                }
            }); 
            
            new AjaxUpload('#uploadPicture', {
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
                    	$("#picture").val(r.url);
                    	vm.template.picture = r.url;
                        alert("上传成功");
                    }else{
                        alert(r.msg);
                    }
                }
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