$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'shop/goods/list',
        datatype: "json",
        colModel: [			
			{ label: 'goodsId', name: 'goodsId', index: 'GOODS_ID', width: 50, key: true },
			{ label: '1为实体，2为虚拟', name: 'type', index: 'TYPE', width: 80 }, 			
			{ label: '标题', name: 'title', index: 'TITLE', width: 80 }, 			
			{ label: '描述', name: 'description', index: 'DESCRIPTION', width: 80 }, 			
			{ label: '图片内容', name: 'content', index: 'CONTENT', width: 80 }, 			
			{ label: '文本内容', name: 'contentTxt', index: 'CONTENT_TXT', width: 80 }, 			
			{ label: '现价', name: 'marketprice', index: 'MARKETPRICE', width: 80 }, 			
			{ label: '成本', name: 'costprice', index: 'COSTPRICE', width: 80 }, 			
			{ label: '原价', name: 'originalprice', index: 'ORIGINALPRICE', width: 80 }, 			
			{ label: '库存', name: 'total', index: 'TOTAL', width: 80 }, 			
			{ label: '0 拍下减库存 1 付款减库存 2 永久不减', name: 'totalcnf', index: 'TOTALCNF', width: 80 }, 			
			{ label: '创建时间', name: 'createtime', index: 'CREATETIME', width: 80 }, 			
			{ label: '图片', name: 'img', index: 'IMG', width: 80 }, 			
			{ label: '图片详情', name: 'imgDetail', index: 'IMG_DETAIL', width: 80 }, 			
			{ label: '其他图片', name: 'imgs', index: 'IMGS', width: 80 }, 			
			{ label: '单次最多购买', name: 'maxbuy', index: 'MAXBUY', width: 80 }, 			
			{ label: '用户最多购买', name: 'usermaxbuy', index: 'USERMAXBUY', width: 80 }, 			
			{ label: '新上', name: 'isnew', index: 'ISNEW', width: 80 }, 			
			{ label: '推荐', name: 'isrecommand', index: 'ISRECOMMAND', width: 80 }, 			
			{ label: '热卖 ', name: 'ishot', index: 'ISHOT', width: 80 }, 			
			{ label: '促销  ', name: 'isdiscount', index: 'ISDISCOUNT', width: 80 }, 			
			{ label: '限时卖', name: 'istime', index: 'ISTIME', width: 80 }, 			
			{ label: '包邮 ', name: 'issendfree', index: 'ISSENDFREE', width: 80 }, 			
			{ label: '是否上架', name: 'isshow', index: 'ISSHOW', width: 80 }, 			
			{ label: '是否删除', name: 'deleted', index: 'DELETED', width: 80 }, 			
			{ label: '评分', name: 'score', index: 'SCORE', width: 80 }, 			
			{ label: '已出售数', name: 'sales', index: 'SALES', width: 80 }, 			
			{ label: '分享标题', name: 'shareTitle', index: 'SHARE_TITLE', width: 80 }, 			
			{ label: '分享图标', name: 'shareIcon', index: 'SHARE_ICON', width: 80 }, 			
			{ label: '分享描述', name: 'shareDesc', index: 'SHARE_DESC', width: 80 }, 			
			{ label: '商品分类', name: 'goodscategoryId', index: 'GOODSCATEGORY_ID', width: 80 }, 			
			{ label: '排序', name: 'displayorder', index: 'DISPLAYORDER', width: 80 }			
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
		goods: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.goods = {};
		},
		update: function (event) {
			var goodsId = getSelectedRow();
			if(goodsId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(goodsId)
		},
		saveOrUpdate: function (event) {
			var url = vm.goods.goodsId == null ? "shop/goods/save" : "shop/goods/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.goods),
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
			var goodsIds = getSelectedRows();
			if(goodsIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"shop/goods/delete",
				    contentType: "application/json",
				    data: JSON.stringify(goodsIds),
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
		getInfo: function(goodsId){
			$.get(baseURL +"shop/goods/info/"+goodsId, function(r){
                vm.goods = r.goods;
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