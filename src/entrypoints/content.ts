// 扩展的选择器列表
const selectors = {
	name: [
		"#USR_NM", // 建行纪念币预约专用选择器
		"#txtName",
		'input[name*="name" i]',
		'input[id*="name" i]',
		'input[placeholder*="姓名" i]',
		"#username",
		"#userName",
		"#oppAcNme",
		'input[name*="usr_nm"]',
		'input[id*="USR_NM"]',
		'input[name*="USR_NM"]',
		'input[id*="客户"]',
		'input[name*="客户"]',
		'input[id*="姓名"]',
		'input[name*="姓名"]',
		'input[id*="客户姓名"]',
		'input[id*="客户姓名"]',
		'input[id*="fullname"]',
		'input[id*="realname"]',
		'label[for="userName"]',
		'label[for="姓名"]',
		'label[for="客户姓名"]',
		'label[for="客户"]',
		".cell .information-input:nth-of-type(1) .el-input__inner",
	],
	idCard: [
		".cell .information-input:nth-of-type(3) .el-input__inner",
		"#CRDT_NO", // 建行纪念币预约专用选择器
		"#txtIdNo",
		'input[name*="id" i]',
		'input[id*="id" i]',
		'input[placeholder*="证件" i]',
		'input[placeholder*="身份证" i]',
		"#idcard",
		"#idCard",
		"#sfzh",
		'input[name="sfzh"]',
		"#credNumTemp",
		".credNumTemp",
		'input[name*="crdt_no"]',
		'input[id*="证件号码"]',
		'input[name*="证件号码"]',
	],
	phone: [
		"#mobile",
		"#MBLPH_NO", // 建行纪念币预约专用选择器
		"#txtMobile",
		'input[name*="phone" i]',
		'input[id*="phone" i]',
		'input[name*="mobile" i]',
		'input[id*="mobile" i]',
		'input[name*="cellphone" i]',
		'input[id*="cellphone" i]',
		'input[placeholder*="手机" i]',
		"#tel",
		"#sjhm",
		'input[name="sjhm"]',
		"#mblph_no",
		'input[id*="telephone"]',
		".secure-input-plain-phone",
		'input[placeholder*="联系方式"]',
		'input[placeholder*="联系电话"]',
		'input[type="tel"]',
		".cell .information-input:nth-of-type(4) .el-input__inner",
	],
	appointmentBranch: [
		"#txtBranch",
		'input[name*="branch" i]',
		'input[id*="branch" i]',
		'input[placeholder*="网点" i]',
		"#branch",
		"#网点",
		"#appointmentBranch",
		'select[name*="branch" i]',
		'select[id*="branch" i]',
		'select[name*="网点" i]',
		'select[id*="网点" i]',
		'select[name*="营业厅" i]',
		'select[id*="营业厅" i]',
		'select[name*="预约网点" i]',
		'select[id*="预约网点" i]',
	],
	appointmentQuantity: [
		"#cardvalue0",
		"#txtQuantity",
		'input[name*="quantity" i]',
		'input[id*="quantity" i]',
		'input[name*="amount" i]',
		'input[id*="amount" i]',
		'input[placeholder*="数量" i]',
		"#quantity",
		"#预约数量",
		"#appointmentQuantity",
		'select[name*="quantity" i]',
		'select[id*="quantity" i]',
		'select[name*="数量" i]',
		'select[id*="数量" i]',
		'select[name*="amount" i]',
		'select[id*="amount" i]',
		'input[aria-label*="数量" i]',
	],
};

// 处理下拉选择框
function handleSelect(select: HTMLSelectElement, value: string) {
	// 1. 尝试直接匹配值
	let found = false;
	for (let i = 0; i < select.options.length; i++) {
		const option = select.options[i];
		if (option.value === value || option.text === value) {
			select.selectedIndex = i;
			found = true;
			break;
		}
	}

	// 2. 如果没有找到完全匹配，尝试模糊匹配
	if (!found) {
		for (let i = 0; i < select.options.length; i++) {
			const option = select.options[i];
			if (option.text.includes(value) || value.includes(option.text)) {
				select.selectedIndex = i;
				found = true;
				break;
			}
		}
	}

	// 触发change事件
	if (found) {
		const event = new Event("change", { bubbles: true });
		select.dispatchEvent(event);
	}
}

export default defineContentScript({
	matches: ["https://*/*", "http://*/*", "file:///*"],
	main() {
		browser.runtime.onMessage.addListener(
			async (message, _sender, sendResponse) => {
				if (message.action !== "fillPersonalInfo") return;

				const data = message.data;
				console.log(data);
				// 遍历所有可能的选择器
				Object.keys(selectors).forEach((field) => {
					const key = field as keyof typeof selectors;
					selectors[key].some((selector: string) => {
						const element = document.querySelector(selector);
						if (element) {
							const value = data[field === "name" ? "userName" : field];

							if (element.tagName.toLowerCase() === "select") {
								// 处理下拉选择框
								handleSelect(element as HTMLSelectElement, value);
							} else {
								// 处理输入框
								(element as HTMLInputElement).value = value;
								// 触发各种事件以确保表单验证生效
								["input", "change", "blur", "focus"].forEach((eventType) => {
									const event = new Event(eventType, { bubbles: true });
									element.dispatchEvent(event);
								});
							}
							return true;
						}
						return false;
					});
				});

				await sendResponse({ success: true });
				return true;
			},
		);
	},
});
