import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Modal,
	message,
	Row,
	Space,
} from "antd";
import type { NoticeType } from "antd/es/message/interface";

interface infoInter {
	userName: string;
	idCard: string;
	phone: string;
	appointmentBranch: string;
	appointmentQuantity: string;
}

const info: infoInter[] = [
	{
		userName: "张三",
		idCard: "360702000000000000",
		phone: "18300000000",
		appointmentBranch: "江西省分行",
		appointmentQuantity: "10",
	},
];

const App: React.FC = () => {
	// 处理弹框modal
	const [title, setTitle] = useState("标题");
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const showModal = (title: string) => {
		setTitle(title);
		setOpen(true);
	};

	const submit = () => {
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
			cusAlert("success", "修改完成");
		}, 500);
	};

	const cancel = () => {
		setOpen(false);
	};

	// 自定义alert样式
	const [messageApi, contextHolder] = message.useMessage();
	const cusAlert = (type: NoticeType | undefined, message: string) => {
		messageApi.open({ type, content: message });
	};

	// 处理填充事件
	const handleFill = (person: (typeof info)[number]) => {
		browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (!tabs[0]?.id) {
				alert("无法获取当前标签页，请刷新后重试");
				return;
			}

			browser.tabs.sendMessage(
				tabs[0].id,
				{
					action: "fillPersonalInfo",
					data: person,
				},
				(response) => {
					if (browser.runtime.lastError) {
						console.error("消息发送错误:", browser.runtime.lastError);
						cusAlert("error", "连接失败，请刷新页面后重试");
						return;
					}

					if (response?.success) {
						cusAlert("success", "信息填写成功！");
					} else {
						cusAlert("error", "信息填写失败，请检查页面是否正确");
					}
				},
			);
		});
	};
	return (
		<>
			{contextHolder}
			<Modal
				title={title}
				open={open}
				confirmLoading={confirmLoading}
				footer={false}
				onOk={submit}
				onCancel={cancel}
			>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={submit}
					onFinishFailed={() => {
						cusAlert("error", "请输入正确完整信息");
					}}
					autoComplete="off"
				>
					<Form.Item<infoInter>
						name="userName"
						rules={[{ required: true, message: "请输入姓名" }]}
					>
						<Space.Compact className="w-full">
							<Space.Addon className="whitespace-nowrap">姓名</Space.Addon>
							<Input placeholder="张三" allowClear />
						</Space.Compact>
					</Form.Item>

					<Form.Item<infoInter>
						name="idCard"
						rules={[{ required: true, message: "请输入身份证号" }]}
					>
						<Space.Compact className="w-full">
							<Space.Addon className="whitespace-nowrap">身份证号</Space.Addon>
							<Input placeholder="3607..." allowClear />
						</Space.Compact>
					</Form.Item>

					<Form.Item<infoInter>
						name="phone"
						rules={[{ required: true, message: "请输入手机号" }]}
					>
						<Space.Compact className="w-full">
							<Space.Addon className="whitespace-nowrap">手机号</Space.Addon>
							<Input placeholder="183..." allowClear />
						</Space.Compact>
					</Form.Item>

					<Form.Item<infoInter>
						name="appointmentBranch"
						rules={[{ required: true, message: "请输入预约网点" }]}
					>
						<Space.Compact className="w-full">
							<Space.Addon className="whitespace-nowrap">预约网点</Space.Addon>
							<Input placeholder="江西省分行" allowClear />
						</Space.Compact>
					</Form.Item>

					<Form.Item<infoInter>
						name="appointmentQuantity"
						rules={[{ required: true, message: "请输入预约数量" }]}
					>
						<Space.Compact className="w-full">
							<Space.Addon className="whitespace-nowrap">预约数量</Space.Addon>
							<Input placeholder="10" allowClear />
						</Space.Compact>
					</Form.Item>

					<Form.Item>
						<div className="flex justify-end gap-4">
							<Button onClick={cancel}>取消</Button>
							<Button type="primary" htmlType="submit">
								确定
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Modal>

			<main className="flex flex-col gap-4">
				<header className="flex w-full items-center justify-between bg-blue-400 p-4">
					<p className="text-white text-xl">预约马钞</p>
					<Button onClick={() => showModal("新增")}>新增</Button>
				</header>
				<main className="flex flex-col p-4">
					<Row gutter={[8, 8]}>
						{info.map((person) => (
							<Col key={person.idCard} xs={24} sm={12} md={8} lg={6} xl={6}>
								<Card style={{ width: "100%" }}>
									<div className="flex flex-col gap-6">
										<div className="flex flex-col gap-2">
											<p>姓名：{person.userName}</p>
											<p>证件号：{person.idCard}</p>
											<p>手机号：{person.phone}</p>
											<p>预约网点：{person.appointmentBranch}</p>
											<p>预约数量：{person.appointmentQuantity}</p>
										</div>
										<div className="flex items-center justify-between gap-4">
											<Button
												color="primary"
												variant="solid"
												onClick={() => handleFill(person)}
											>
												填写
											</Button>
											<Button
												color="green"
												variant="solid"
												onClick={() => showModal("编辑")}
											>
												编辑
											</Button>
											<Button color="danger" variant="solid">
												删除
											</Button>
										</div>
									</div>
								</Card>
							</Col>
						))}
					</Row>
				</main>
			</main>
		</>
	);
};

export default App;
