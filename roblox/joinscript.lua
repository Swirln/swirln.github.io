-- Made with Swirln's Joinscript Creator @ swirln.github.io/roblox/scripts/join.html
-- wip no snooping

--[[
	== Enums
	
	ChatStyle:
		0: Enum.ChatStyle.Classic
		1: Enum.ChatStyle.Bubble
		2: Enum.ChatStyle.ClassicAndBubble
	MembershipType:
		0: Enum.MembershipType.None
		1: Enum.MembershipType.BuildersClub
		2: Enum.MembershipType.TurboBuildersClub
		3: Enum.MembershipType.OutrageousBuildersClub
--]]

local NetworkClient = game:GetService("NetworkClient")
local Players = game:GetService("Players")
local Options = {
	["player"] = {
		["name"] = "Player",
		["id"] = 0,
		["charapp"] = "",
		["membership"] = Enum.MembershipType.None,
		["underage"] = false,
		["accountAge"] = 365
	},
	["general"] = {
		["chatStyle"] = Enum.ChatStyle.ClassicAndBubble,
		["safechat"] = false,
		["randomId"] = true,
		["placeId"] = -1,
		["reportURL"] = "",
		["shitNetCode"] = false,
		["canSetId"] = false
	},
	["server"] = {
		["ip"] = "localhost",
		["port"] = 53640
	}
}


if Options["general"]["shitNetCode"] then -- thanks roblox for the brilliant idea of serverside movement B)
	settings().Network.SendRate = 30
	settings().Network.ReceiveRate = 60
	settings().Network.PhysicsReplicationUpdateRate = 30000
	settings().Network.PhysicsReceiveDelayFactor = 0
	settings().Network.PhysicsReliability = 0
	settings().Rendering.FrameRateManager = 2
end

--NetworkClient:PlayerConnect