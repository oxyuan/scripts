# Quantumult X 个人配置

本目录存放 Quantumult X 的**个人自定义规则**。所有手写的分流 / 重写规则集中在此，
通过 GitHub Raw 地址以「远程资源」方式被 Quantumult X 引用，实现一处修改、多端同步。

## 目录结构

```
quantumultx/
└── rules/
    ├── OwnFilter.list     # 个人自定义分流规则（[filter_remote] 引用）
    └── OwnRewrite.snippet # 个人自定义重写规则 + MITM 主机名（[rewrite_remote] 引用）
```

## 引入方式

在 Quantumult X 配置文件（`设置 → 配置文件 → 编辑`）中：

```
[filter_remote]
https://raw.githubusercontent.com/oxyuan/scripts/main/quantumultx/rules/OwnFilter.list, tag=个人分流, update-interval=86400, opt-parser=false, enabled=true

[rewrite_remote]
https://raw.githubusercontent.com/oxyuan/scripts/main/quantumultx/rules/OwnRewrite.snippet, tag=个人重写, update-interval=86400, opt-parser=false, enabled=true
```

> ⚠️ 两条个人资源都建议放在各自区块的**首行**。Quantumult X 的分流 / 重写均按
> 加载顺序匹配，靠前的规则优先生效，个人规则置顶才能覆盖第三方规则资源。
>
> ⚠️ `opt-parser=false`：本仓库文件已是 Quantumult X 原生格式，无需资源解析器转换。

## 生效范围说明

- `[filter_local]` 中只保留 `final, 兜底分流`（Quantumult X 要求兜底策略必须存在于本地）
  以及**敏感规则**（见下节）。
- `[rewrite_local]`、`[mitm] hostname` 中的个人规则已全部迁移至本目录。
- 局域网 / 保留地址的 `ip-cidr` 直连规则放在 `OwnFilter.list` 中统一维护。

## 敏感信息

以下内容**只存在于本地 Quantumult X 配置文件**（`[filter_local]`），不进入本仓库：

- 自建服务器 / VPS 的公网 IP（及任何私人 IP、内网网段、主机名）
- 订阅链接中的 token、节点密码、私钥

判断标准：一旦泄漏会暴露「我是谁 / 我的服务器在哪 / 我的凭据」的内容，一律不入库。
本仓库的规则文件因此可以安全公开，clone 者按需自行补充。

```ini
[filter_local]
ip-cidr, <自建服务器 IP>/32, direct   # 代理节点封禁 22 端口，SSH 必须直连
final, 兜底分流
```


## 更新流程

在本仓库的 `scripts` 目录下执行：

```bash
git add quantumultx/
git commit -m "chore(quantumultx): update own rules"
git push
```

Quantumult X 端在 `设置 → 分流 / 重写 → 规则资源 → 全部更新` 拉取最新规则。

> ⚠️ 提交信息中同样不要出现 IP、域名、token——它和文件内容一样会留在公开的提交历史里。
