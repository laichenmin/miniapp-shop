$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'shop/store/list',
        datatype: "json",
        colModel: [			
			{ label: 'storeId', name: 'storeId', index: 'store_id', width: 50, key: true },
			{ label: '用户id', name: 'uid', index: 'uid', width: 80 }, 			
			{ label: '图标', name: 'icon', index: 'icon', width: 80 }, 			
			{ label: '名称', name: 'name', index: 'name', width: 80 }, 			
			{ label: '简介', name: 'introduction', index: 'introduction', width: 80 }, 			
			{ label: '联系电话', name: 'phone', index: 'phone', width: 80 }			
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
		store: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.store = {};
		},
		update: function (event) {
			var storeId = getSelectedRow();
			if(storeId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(storeId)
		},
		saveOrUpdate: function (event) {
			var url = vm.store.storeId == null ? "shop/store/save" : "shop/store/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.store),
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
			var storeIds = getSelectedRows();
			if(storeIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"shop/store/delete",
				    contentType: "application/json",
				    data: JSON.stringify(storeIds),
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
		getInfo: function(storeId){
			$.get(baseURL +"shop/store/info/"+storeId, function(r){
                vm.store = r.store;
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