$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'appuser/relationship/list',
        datatype: "json",
        colModel: [			
			{ label: 'relationshipId', name: 'relationshipId', index: 'RELATIONSHIP_ID', width: 50, key: true },
			{ label: '用户', name: 'uid', index: 'UID', width: 80 }, 			
			{ label: '上级用户', name: 'puid', index: 'PUID', width: 80 }, 			
			{ label: '下级用户', name: 'subuids', index: 'SUBUIDS', width: 80 }, 			
			{ label: '个人业绩', name: 'individualPerformance', index: 'INDIVIDUAL_PERFORMANCE', width: 80 }, 			
			{ label: '团队业绩', name: 'teamPerformance', index: 'TEAM_PERFORMANCE', width: 80 }, 			
			{ label: '总佣金', name: 'totalCommission', index: 'TOTAL_COMMISSION', width: 80 }, 			
			{ label: '未提佣金', name: 'commission', index: 'COMMISSION', width: 80 }, 			
			{ label: '奖金', name: 'prize', index: 'PRIZE', width: 80 }, 			
			{ label: '个人消费', name: 'personal', index: 'PERSONAL', width: 80 }, 			
			{ label: '状态0未申请，2申请中，1商户', name: 'status', index: 'STATUS', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'CREATE_TIME', width: 80 }, 			
			{ label: '真实姓名', name: 'realname', index: 'REALNAME', width: 80 }, 			
			{ label: '银行名称', name: 'bankname', index: 'BANKNAME', width: 80 }, 			
			{ label: '银行卡号', name: 'account', index: 'ACCOUNT', width: 80 }, 			
			{ label: '审核时间', name: 'checkTime', index: 'CHECK_TIME', width: 80 }, 			
			{ label: '粉丝量', name: 'fans', index: 'FANS', width: 80 }, 			
			{ label: '省代数量', name: 'shengdaiNum', index: 'SHENGDAI_NUM', width: 80 }, 			
			{ label: '身份证正面照', name: 'idCardFace', index: 'Id_CARD_FACE', width: 80 }, 			
			{ label: '身份证反面照', name: 'idCardBack', index: 'Id_CARD_BACK', width: 80 }, 			
			{ label: '手机号', name: 'phone', index: 'PHONE', width: 80 }, 			
			{ label: 'email', name: 'email', index: 'EMAIL', width: 80 }, 			
			{ label: '地址', name: 'address', index: 'ADDRESS', width: 80 }			
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
		relationship: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.relationship = {};
		},
		update: function (event) {
			var relationshipId = getSelectedRow();
			if(relationshipId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(relationshipId)
		},
		saveOrUpdate: function (event) {
			var url = vm.relationship.relationshipId == null ? "appuser/relationship/save" : "appuser/relationship/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.relationship),
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
			var relationshipIds = getSelectedRows();
			if(relationshipIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"appuser/relationship/delete",
				    contentType: "application/json",
				    data: JSON.stringify(relationshipIds),
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
		getInfo: function(relationshipId){
			$.get(baseURL +"appuser/relationship/info/"+relationshipId, function(r){
                vm.relationship = r.relationship;
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