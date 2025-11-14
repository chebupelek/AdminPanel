import { Button, Col, Row, Card, Select, Input, Switch, Space, Pagination, Modal, DatePicker } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersListThunkCreator, getRolesShortListThunkCreator, addRoleThunkCreator } from "../../Reducers/UsersListReducer";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserCard from "./userCard";

function Users() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.users.users)  || [];
    const pagination = useSelector(state => state.users.pagination);
    const rolesShort = useSelector(state => state.users.roles) || [];

    const [searchParams, setSearchParams] = useSearchParams();

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [selectedSort, setSelectedSort] = useState("");
    const [selectedSize, setSelectedSize] = useState("6");
    const [selectedPage, setSelectedPage] = useState("1");
    const [rolesId, setRolesId] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const nameParam = searchParams.get('name') || "";
        const mailParam = searchParams.get('mail') || "";
        const sortingParam = searchParams.get('sort') || "";
        const sizeParam = searchParams.get('num') || 6;
        const pageParam = searchParams.get('page') || 1;
        const rolesParam = searchParams.getAll('rolesIds') || [];

        setName(nameParam);
        setMail(mailParam);
        setSelectedSort(sortingParam);
        setSelectedSize(sizeParam);
        setSelectedPage(pageParam);
        setRolesId(rolesParam);

        const queryParams = [
            nameParam ? `name=${encodeURIComponent(nameParam)}` : '',
            mailParam ? `mail=${encodeURIComponent(mailParam)}` : '',
            ...rolesParam.map(r => `rolesIds=${r}`),
            sortingParam ? `sort=${sortingParam}` : '',
            `page=${pageParam}`,
            `num=${sizeParam}`
        ].filter(Boolean).join('&');

        dispatch(getUsersListThunkCreator(queryParams, navigate));
    }, [searchParams, dispatch]);

    const handleSearch = () => {
        const queryParams = [
            name ? `name=${encodeURIComponent(name)}` : '',
            mail ? `mail=${encodeURIComponent(mail)}` : '',
            ...rolesId.map(roleId => `rolesIds=${roleId}`),
            selectedSort ? `sort=${selectedSort}` : '',
            `page=${1}`,
            `num=${selectedSize}`
        ].filter(Boolean).join('&');
        setSelectedPage(1);
        setSearchParams(queryParams);
    };

    const handleChangePage = (page) => {
        setSelectedPage(page.toString());
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const isSubmitDisabled = selectedUsers.length === 0 || !selectedRoleId;

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const resetState = () => {
        setSelectedUsers([]);
        setSelectedRoleId(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSelectUser = (id, checked) => {
        if (checked) {
            setSelectedUsers(prev => [...prev, id]);
        } else {
            setSelectedUsers(prev => prev.filter(x => x !== id));
        }
    };

    return (
        <div style={{ width: '75%' }}>
            <Row align="middle">
                <h1>Пользователи</h1>
                <Button type="primary" style={{ backgroundColor: '#317dba', marginLeft: 'auto' }} onClick={showModal}>
                    Добавить роль
                </Button>
            </Row>
            <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <h2>Фильтры и сортировка</h2>
                    <div style={{ width: '100%' }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span>Имя</span>
                                <Input style={{ width: '100%' }} value={name} onChange={e => setName(e.target.value)} />
                            </Col>
                            <Col span={12}>
                                <span>Почта</span>
                                <Input style={{ width: '100%' }} value={mail} onChange={e => setMail(e.target.value)} />
                            </Col>
                        </Row>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Row gutter={16} align="middle">
                            <Col span={12}>
                                <span>Сортировка пользователей</span>
                                <Select style={{ width: '100%' }} value={selectedSort} onChange={value => setSelectedSort(value)}>
                                    <Select.Option value=""></Select.Option>
                                    <Select.Option value="NameAsc">По имени пользователя (от А-Я)</Select.Option>
                                    <Select.Option value="NameDesc">По имени пользователя (от Я-А)</Select.Option>
                                    <Select.Option value="MailAsc">По почте пользователя (от А-Я)</Select.Option>
                                    <Select.Option value="MailDesc">По почте пользователя (от Я-А)</Select.Option>
                                    <Select.Option value="AccountNumberAsc">По номеру пользователя (сначала малые)</Select.Option>
                                    <Select.Option value="AccountNumberDesc">По номеру пользователя (сначала большие)</Select.Option>
                                </Select>
                            </Col>
                            <Col span={12}>
                                <span>Фильтр по ролям</span>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Выберите роли"
                                    value={rolesId}
                                    style={{ width: "100%" }}
                                    showSearch
                                    filterOption={false}
                                    onFocus={() => {
                                        dispatch(getRolesShortListThunkCreator(`name=`, navigate));
                                    }}
                                    onSearch={(value) => {
                                        dispatch(getRolesShortListThunkCreator(`name=${value}`, navigate));
                                    }}
                                    onChange={(values) => {
                                        setRolesId(values);
                                    }}
                                    onInputKeyDown={(e) => {
                                        if (e.target.value === "") {
                                            dispatch(getRolesShortListThunkCreator(`name=`, navigate));
                                        }
                                    }}
                                >
                                    {rolesShort.map(role => (
                                        <Select.Option key={role.id} value={role.id}>
                                            {role.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Row gutter={16} align="middle">
                            <Col span={8}>
                                <span>Число пользователей на странице</span>
                                <Select style={{ width: '100%' }} value={selectedSize} onChange={value => setSelectedSize(value)}>
                                    <Select.Option value="6">6</Select.Option>
                                    <Select.Option value="7">7</Select.Option>
                                    <Select.Option value="8">8</Select.Option>
                                    <Select.Option value="9">9</Select.Option>
                                    <Select.Option value="10">10</Select.Option>
                                    <Select.Option value="20">20</Select.Option>
                                    <Select.Option value="30">30</Select.Option>
                                    <Select.Option value="40">40</Select.Option>
                                    <Select.Option value="100">100</Select.Option>
                                </Select>
                            </Col>
                            <Col span={8}></Col>
                            <Col span={8}>
                                <Button type="primary" block style={{ backgroundColor: '#317dba', marginLeft: 'auto' }} onClick={handleSearch}>
                                    Поиск
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Space>
            </Card>
            {users ? 
                <div>
                    <Row gutter={16} style={{ marginTop: '2%' }}>
                        {users.map(user => (
                            <Col key={user.id} span={24 / (window.innerWidth > 1200 ? 2 : 1)}>
                                <UserCard
                                    id={user.id}
                                    name={user.accountName}
                                    mail={user.mail}
                                    accountTag={user.accountTag}
                                    accountCreateDate={user.accountCreateDate}
                                    systemRoles={user.systemRoles}
                                    checked={selectedUsers.includes(user.id)}
                                    onCheck={handleSelectUser}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row justify="center" style={{ marginTop: '2%' }}>
                        <Pagination current={parseInt(selectedPage)} pageSize={parseInt(1)} total={pagination.PageCount} onChange={page => handleChangePage(page)} showSizeChanger={false} />
                    </Row>
                </div> : 
            <></>}
            <Modal open={isModalVisible} onCancel={handleCancel} closeIcon={false}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        block
                        disabled={isSubmitDisabled}
                        style={{ backgroundColor: "#317cb9" }}
                        onClick={() => {
                            const payload = {
                                roleId: selectedRoleId,
                                usersIds: selectedUsers
                            };

                            dispatch(addRoleThunkCreator(payload, navigate, resetState, handleCloseModal));
                        }}
                    >
                        Добавить роль
                    </Button>
                ]}
            >
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <h1>Добавление роли</h1>

                    <Select
                        showSearch
                        placeholder="Выберите роль"
                        filterOption={false}

                        onFocus={() => {
                            dispatch(getRolesShortListThunkCreator(`name=`, navigate));
                        }}

                        onSearch={(value) => {
                            dispatch(getRolesShortListThunkCreator(`name=${value}`, navigate));
                        }}

                        onChange={(value) => setSelectedRoleId(value)}

                        onInputKeyDown={(e) => {
                            if (e.target.value === "") {
                                dispatch(getRolesShortListThunkCreator(`name=`, navigate));
                            }
                        }}

                        style={{ width: "100%" }}
                    >
                        {rolesShort.map(role => (
                            <Select.Option key={role.id} value={role.id}>
                                {role.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            </Modal>
        </div>
    );
}

export default Users;