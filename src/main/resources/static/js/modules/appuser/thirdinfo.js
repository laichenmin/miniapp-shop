$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'appuser/thirdinfo/list',
        datatype: "json",
        colModel: [			
			{ label: 'thirdUserId', name: 'thirdUserId', index: 'THIRD_USER_ID', width: 50, key: true },
			{ label: '用户id', name: 'uid', index: 'UID', width: 80 }, 			
			{ label: '客户端（qq,wechat,weibo）', name: 'client', index: 'CLIENT', width: 80 }, 			
			{ label: '昵称', name: 'thirdNickname', index: 'THIRD_NICKNAME', width: 80 }, 			
			{ label: '头像', name: 'thirdAvatar', index: 'THIRD_AVATAR', width: 80 }, 			
			{ label: 'OPENID', name: 'openid', index: 'OPENID', width: 80 }, 			
			{ label: '性别', name: 'gender', index: 'GENDER', width: 80 }, 			
			{ label: '', name: 'livingPlace', index: 'LIVING_PLACE', width: 80 }, 			
			{ label: '', name: 'birthPlace', index: 'BIRTH_PLACE', width: 80 }, 			
			{ label: '', name: 'birthDay', index: 'BIRTH_DAY', width: 80 }			
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
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		thirdinfo: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.thirdinfo = {};
		},
		update: function (event) {
			var thirdUserId = getSelectedRow();
			if(thirdUserId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(thirdUserId)
		},
		saveOrUpdate: function (event) {
			var url = vm.thirdinfo.thirdUserId == null ? "appuser/thirdinfo/save" : "appuser/thirdinfo/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.thirdinfo),
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
			var thirdUserIds = getSelectedRows();
			if(thirdUserIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"appuser/thirdinfo/delete",
				    contentType: "application/json",
				    data: JSON.stringify(thirdUserIds),
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
		getInfo: function(thirdUserId){
			$.get(baseURL +"appuser/thirdinfo/info/"+thirdUserId, function(r){
                vm.thirdinfo = r.thirdinfo;
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