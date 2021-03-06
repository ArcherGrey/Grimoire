# CDN

::: tip 概念

CDN `Content Delivery Network` 内容分发网络，是构建在现有网络基础上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率

:::

::: tip 基本原理

广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全
局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。

:::

::: tip 基本思路

尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，`CDN` 系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 `Internet` 网络拥挤的状况，提高用户访问网站的响应速度

:::

<img :src="$withBase('/net_cdn_1.png')" alt="流程">

组成：

- 内容缓存设备
- 内容交换机
- 内容路由器
- 内容管理系统

功能：

- 优化网络带宽：远程用户访问从 `cache` 服务器上读取数据，减少远程访问的带宽
- 提供服务器端加速：智能选择最快的 `cache` 服务器
- 降低建站维护成本
- 提高网络稳定性
- 提供负载均衡
- 镜像服务：消除不同运营商之间差异造成的影响

关键技术：

- 内容发布：借助于建立索引、缓存、流分裂、组播（`Multicast`）等技术，将内容发布或投递到距离用户最近的远程服务点（`POP`）处
- 内容路由：通过内容路由器中的重定向（`DNS`）机制，在多个远程 `POP` 上均衡用户的请求，以使用户请求得到最近内容源的响应
- 内容存储
  - 内容源存储
  - `cache` 节点中的存储
- 内容管理：通过内部和外部监控系统，获取网络部件的状况信息，测量内容发布的端到端性能（如包丢失、延时、平均带宽、启动时间、帧速率等），保证网络处于最佳的运行状态
