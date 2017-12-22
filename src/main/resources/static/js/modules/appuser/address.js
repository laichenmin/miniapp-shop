$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'appuser/address/list',
        datatype: "json",
        colModel: [			
			{ label: 'addressId', name: 'addressId', index: 'ADDRESS_ID', width: 50, key: true },
			{ label: '用户id', name: 'uid', index: 'UID', width: 80 }, 			
			{ label: '姓名', name: 'username', index: 'USERNAME', width: 80 }, 			
			{ label: '手机号', name: 'mobile', index: 'MOBILE', width: 80 }, 			
			{ label: '详细地址', name: 'address', index: 'ADDRESS', width: 80 }, 			
			{ label: '邮编', name: 'zipcode', index: 'ZIPCODE', width: 80 }, 			
			{ label: '省份', name: 'province', index: 'PROVINCE', width: 80 }, 			
			{ label: '城市', name: 'city', index: 'CITY', width: 80 }			
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
		address: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.address = {};
		},
		update: function (event) {
			var addressId = getSelectedRow();
			if(addressId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(addressId)
		},
		saveOrUpdate: function (event) {
			var url = vm.address.addressId == null ? "appuser/address/save" : "appuser/address/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.address),
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
			var addressIds = getSelectedRows();
			if(addressIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"appuser/address/delete",
				    contentType: "application/json",
				    data: JSON.stringify(addressIds),
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
		getInfo: function(addressId){
			$.get(baseURL +"appuser/address/info/"+addressId, function(r){
                vm.address = r.address;
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