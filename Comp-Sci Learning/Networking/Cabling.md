When trying to connect devices there are two options: _wired_ and _wireless_.

Wired networks are connected through cables of which there are two types:
1. Copper
	- cheaper
	- common for short distances (signal degrades over long distances)
	- uses electrical signals to send data
	- affected by outside interference
2. Fiber
	- more expensive
	- used for long distances
	- made of strands of glass
	- uses light signals
	- unaffected by outside interference

A wired [[LAN]] uses a _[[protocol]]_ called **Ethernet**. Ethernet is made of different parts such as the physical layer and the data layer (Media Access Control).
The physical layer determines the type of cabling and the speed at which data is sent and the data layer determines how data should be formatted and sent.

The reason Ethernet is layered is so that devices with different cables and different speeds can still communicate with each other.

The Ethernet standard was created by IEEE which assigned 802 to be the code to reference all standards related to [[LAN]] technology. Ex. the code for the Ethernet standard is 802.3 and each Ethernet speed has a different code:

| Code    | Speed   | Colloquial name |
| ------- | ------- | --------------- |
| 802.3i  | 10Mbps  |                 |
| 802.3u  | 100Mbps |                 |
| 802.3ab | 1Gbps   |                 |
| 802.3an | 10Gbps  | 10GBASE-T       |
Breakdown of `10GBASE-T`: `10G` refers to the speed, `BASE` stands for baseband (cables), and `T` stands for UTP cables

