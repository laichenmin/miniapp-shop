$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'shop/storegoods/list',
        datatype: "json",
        colModel: [			
			{ label: 'storeGoodsId', name: 'storeGoodsId', index: 'store_goods_id', width: 50, key: true },
			{ label: '店铺id', name: 'storeId', index: 'store_id', width: 80 }, 			
			{ label: '商品id', name: 'goodsId', index: 'goods_id', width: 80 }			
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
		storeGoods: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.storeGoods = {};
		},
		update: function (event) {
			var storeGoodsId = getSelectedRow();
			if(storeGoodsId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(storeGoodsId)
		},
		saveOrUpdate: function (event) {
			var url = vm.storeGoods.storeGoodsId == null ? "shop/storegoods/save" : "shop/storegoods/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.storeGoods),
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
			var storeGoodsIds = getSelectedRows();
			if(storeGoodsIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"shop/storegoods/delete",
				    contentType: "application/json",
				    data: JSON.stringify(storeGoodsIds),
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
		getInfo: function(storeGoodsId){
			$.get(baseURL +"shop/storegoods/info/"+storeGoodsId, function(r){
                vm.storeGoods = r.storeGoods;
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