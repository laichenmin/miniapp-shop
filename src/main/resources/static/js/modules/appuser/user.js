$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'appuser/user/list',
        datatype: "json",
        colModel: [			
			{ label: 'userId', name: 'userId', index: 'USER_ID', width: 50, key: true },
			{ label: '', name: 'username', index: 'USERNAME', width: 80 }, 			
			{ label: '', name: 'phone', index: 'PHONE', width: 80 }, 			
			{ label: '', name: 'password', index: 'PASSWORD', width: 80 }, 			
			{ label: '', name: 'roleId', index: 'ROLE_ID', width: 80 }, 			
			{ label: '1正常 0禁用 2在线', name: 'status', index: 'STATUS', width: 80 }, 			
			{ label: '头像', name: 'avatar', index: 'AVATAR', width: 80 }, 			
			{ label: '性别（男Y女X）', name: 'gender', index: 'GENDER', width: 80 }, 			
			{ label: '生日', name: 'birthDay', index: 'BIRTH_DAY', width: 80 }, 			
			{ label: '出生地点', name: 'birthPlace', index: 'BIRTH_PLACE', width: 80 }, 			
			{ label: '现居地', name: 'livingPlace', index: 'LIVING_PLACE', width: 80 }, 			
			{ label: '账户余额', name: 'accountMoney', index: 'ACCOUNT_MONEY', width: 80 }, 			
			{ label: '体验金', name: 'testMoney', index: 'TEST_MONEY', width: 80 }, 			
			{ label: '融云token', name: 'rongToken', index: 'RONG_TOKEN', width: 80 }, 			
			{ label: '', name: 'startTime', index: 'START_TIME', width: 80 }, 			
			{ label: '', name: 'email', index: 'EMAIL', width: 80 }, 			
			{ label: '简介', name: 'introduction', index: 'INTRODUCTION', width: 80 }, 			
			{ label: '擅长了领域', name: 'honor', index: 'HONOR', width: 80 }, 			
			{ label: '', name: 'tag', index: 'TAG', width: 80 }, 			
			{ label: '', name: 'videoUrl', index: 'VIDEO_URL', width: 80 }, 			
			{ label: '', name: 'accessToken', index: 'ACCESS_TOKEN', width: 80 }, 			
			{ label: '我的专属码', name: 'exclusiveCode', index: 'EXCLUSIVE_CODE', width: 80 }, 			
			{ label: '二维码', name: 'twoDimensionCode', index: 'TWO_DIMENSION_CODE', width: 80 }, 			
			{ label: '是否删除', name: 'isDelete', index: 'IS_DELETE', width: 80 }, 			
			{ label: '上级id（接受上级id）', name: 'pid', index: 'PID', width: 80 }, 			
			{ label: '', name: 'lifeCode', index: 'LIFE_CODE', width: 80 }, 			
			{ label: '', name: 'lifeDetail', index: 'LIFE_DETAIL', width: 80 }			
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
		user: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.user = {};
		},
		update: function (event) {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(userId)
		},
		saveOrUpdate: function (event) {
			var url = vm.user.userId == null ? "appuser/user/save" : "appuser/user/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.user),
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
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"appuser/user/delete",
				    contentType: "application/json",
				    data: JSON.stringify(userIds),
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
		getInfo: function(userId){
			$.get(baseURL +"appuser/user/info/"+userId, function(r){
                vm.user = r.user;
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