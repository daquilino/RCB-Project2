//creating the for sale table
module.exports = function(sequelize, DataTypes)
{
	var itemsForSale = sequelize.define("itemsForSale", 
	{
		item_name: 
		{
			type: DataTypes.STRING,
			allowNull: false,
			validate: 
			{
				isAlpha: true,
				notEmpty: true
			}
		},
		quantity:
		{
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: 
			{
				isInt: true,
				min: 1
			}
		},
		starting_price:
		{
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: 
			{
				isInt: true,
				min: 1
			}
		},
		highest_bid:
		{
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: 
			{
				isInt: true,
				min: 1
			}
		},
		highest_bidder:
		{
			type: DataTypes.STRING,
			allowNull: true,
			validate: 
			{
				isAlpha: true,
				notEmpty: true
			}
		},
	}, 
	{
		//setting the foreign key of userID
		classMethods: 
		{
			associate: function(models)
			{
				//userID foreign key is required to put an item up for sale
				itemsForSale.belongsTo(models.allUsers, 
				{
					foreignKey: 
					{
						allowNull: false
					}
				});
			}
		},
		freezeTableName: true,
		timestamps: false
	});

	return itemsForSale;
};