import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Modal,
	message,
	Popconfirm,
	Row,
	Space,
} from "antd";
import type { NoticeType } from "antd/es/message/interface";
import { useCallback, useEffect, useState } from "react";

interface infoInter {
	userName: string;
	idCard: string;
	phone: string;
	appointmentBranch: string;
	appointmentQuantity: string;
}

const App: React.FC = () => {
	const [info, setInfo] = useState<infoInter[]>([]);

	// 将 message/useMessage 提前并 memoize cusAlert
	const [messageApi, contextHolder] = message.useMessage();
	const cusAlert = useCallback(
		(type: NoticeType | undefined, msg: string) => {
			messageApi.open({ type, content: msg });
		},
		[messageApi],
	);

	// 获取本地存储的数据（memoized）
	const getInfo = useCallback(async () => {
		try {
			const res = await storage.getItem<infoInter[]>("local:info");
			if (!res) return;
			setInfo(res);
		} catch {
			cusAlert("error", "获取存储数据出错");
		}
	}, [cusAlert]);

	// 页面挂载时获取一次数据
	useEffect(() => {
		getInfo();
	}, [getInfo]);

	// 处理弹框modal
	const [title, setTitle] = useState("标题");
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	// 弹框内表单处理
	const [form] = Form.useForm();

	const [infoToEdit, setInfoToEdit] = useState<infoInter | undefined>();

	// 在 Modal 打开时设置表单值
	useEffect(() => {
		if (open && infoToEdit) {
			form.setFieldsValue(infoToEdit);
		} else if (open && !infoToEdit) {
			form.resetFields();
		}
	}, [open, infoToEdit, form]);

	// 弹出对话框，新增与编辑事件
	const showModal = (title: "编辑" | "新增", info?: infoInter) => {
		setTitle(title);
		setOpen(true);
		if (title === "编辑" && info) {
			setInfoToEdit(info);
		} else {
			setInfoToEdit(undefined);
		}
	};

	// 确认新增或修改信息按钮
	const handleSubmit = async (value: infoInter) => {
		console.log(value);
		setConfirmLoading(true);
		const storageInfo = await storage.getItem<infoInter[]>("local:info");

		if (infoToEdit) {
			// 编辑：替换原有数据
			const updatedInfo = storageInfo?.map((item) =>
				item.idCard === infoToEdit.idCard ? value : item,
			) || [value];
			await storage.setItem("local:info", updatedInfo);
		} else {
			// 新增：添加新数据
			if (storageInfo) {
				storageInfo.push(value);
				await storage.setItem("local:info", storageInfo);
			} else {
				await storage.setItem("local:info", [value]);
			}
		}

		getInfo();
		setOpen(false);
		setConfirmLoading(false);
		cusAlert("success", "修改完成");
	};

	// 弹框取消按钮事件
	const handleCancel = () => {
		setOpen(false);
	};

	// 填写逻辑(给主页面发信息，填充逻辑在主页面处理)
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

	// 删除事件
	const handleDelete = async (idCard: string) => {
		const res = await storage.getItem<infoInter[]>("local:info");
		const info = res?.filter((item) => item.idCard !== idCard);
		await storage.setItem("local:info", info);
		getInfo();
		cusAlert("success", "删除成功");
	};

	return (
		<>
			{contextHolder}
			<Modal
				title={title}
				open={open}
				confirmLoading={confirmLoading}
				footer={false}
				onCancel={handleCancel}
				forceRender
			>
				<Form
					form={form}
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={handleSubmit}
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
							<Button onClick={handleCancel}>取消</Button>
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
						{info.length !== 0 ? (
							info.map((person) => (
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
													onClick={() => showModal("编辑", person)}
												>
													编辑
												</Button>
												<Popconfirm
													title="删除个人信息"
													description="您确认删除此条个人信息吗"
													cancelText="取消"
													okText="确定"
													onConfirm={() => handleDelete(person.idCard)}
												>
													<Button color="danger" variant="solid">
														删除
													</Button>
												</Popconfirm>
											</div>
										</div>
									</Card>
								</Col>
							))
						) : (
							<div className="self-center">
								您还未添加信息，请点击右上角添加个人预约信息
							</div>
						)}
					</Row>
				</main>
			</main>
		</>
	);
};

export default App;
