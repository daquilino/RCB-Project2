//dependencies ===========================================================
const DB = require("../../models");

/*
In order for a botBid to be made, 3 decisions must be made.

    1. Select an item from itemsForSale
        - query database for totalNum itemsForSale
        - randomly pick and item from there
    2. Decide if want to buy item
        - based on preference variables * RNG
    3. Decide how much to spend (if want to buy item)
        - based on preference variables * RNG
    
- If decide to buy item === true
    - make bid for whateverAmountDecided
*/

//constructor =============================================================
function BidderBot(name)
{
	//Instance Variables ----------------------------------
	this.name = name;

	//Methods ---------------------------------------------

	//private
	var GetRandomItemIndex = function(numItems)
	{
		return Math.floor((Math.random() * numItems));
	};

	//private
	var DecideIfBuying = function(itemObject)
	{
		//in future implementation, preferences will be taken into account

		console.log("------- Deciding if I want to buy it ----------");
		return Math.round(Math.random());
	};

	//private
	var DecideBidAmount = function(itemObject)
	{
		//in future implementation, prefrences will be taken into account

		console.log("----- Deciding how much I want to spend -------");
		if (itemObject.highest_bid !== null)
		{
			console.log("going off highest bid");
			return Math.round((Math.random() + 1) * itemObject.highest_bid);
		}
		else	//nobody has bid on the item yet
		{
			console.log("going off starting price");
			return Math.round((Math.random() + 1) * itemObject.starting_price);
		}
	};

	//private
	var MakeBid = function(bidAmount, itemObject)
	{
		//make bid on selected item
	};

	//private
	var SelectItem = function()
	{
		//query itemsForSale
		DB.itemsForSale.findAll({}).then(function(saleItemsRaw)
		{
			var saleItems = [];

			//pull dataValues objects from saleItemsRaw
			for (var index = 0; index < saleItemsRaw.length; index++)
				saleItems.push(saleItemsRaw[index].dataValues);

			//Randomly pick one of the items
			console.log("----- Selecting an Item--------");
			var chosenIndex = GetRandomItemIndex(saleItems.length);

			//Decide if want to buy that item
			var isBuying = DecideIfBuying(saleItems[chosenIndex]);

			if (isBuying)
			{
				console.log("I'm going to bid: " + 
				DecideBidAmount(saleItems[chosenIndex]) + "\n" +
				"on item at index: " + chosenIndex);
				console.log(saleItems[chosenIndex]);
			}
			else
			{
				console.log("I'm not buying the item at index: " + chosenIndex);
				console.log(saleItems[chosenIndex]);
			}

		});
	};

	//public
	this.StartBiddingCycle = function()
	{
		SelectItem();
	};

	
}

//testing =================================================================
var hank = new BidderBot("Hank");
hank.StartBiddingCycle();









