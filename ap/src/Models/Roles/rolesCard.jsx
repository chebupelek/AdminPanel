import { Card, Typography, Space, Button, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { createRoleThunkCreator, deleteRoleThunkCreator, updateRoleThunkCreator } from "../../Reducers/RolesReducer";
import { useState } from 'react';

function RoleCard({ id, name, type, childRoles = [], level = 0, navigate }) {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [roleName, setRoleName] = useState(name);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newRoleName, setNewRoleName] = useState("");

    const [isCollapsed, setIsCollapsed] = useState(true);

    const typeText = type === 1 ? "Учитель" : "Студент";

    const handleDelete = () => {
        const payload = { id };
        dispatch(deleteRoleThunkCreator(payload, navigate));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setRoleName(name);
        setIsEditing(false);
    };

    const handleSave = () => {
        const payload = { id, name: roleName };
        dispatch(updateRoleThunkCreator(payload, navigate));
        setIsEditing(false);
    };

    const showModal = () => {
        setNewRoleName("");
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleCreateRole = () => {
        const payload = { id, name: newRoleName };
        dispatch(createRoleThunkCreator(payload, navigate));
        setIsModalVisible(false);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const marginLeft = `${Math.min(level, 4) * 20}px`;

    return (
        <Card 
            style={{ 
                width: '100%', 
                boxSizing: 'border-box', 
                backgroundColor: '#f6f6fb', 
                marginTop: '1%', 
                marginLeft,
                border: '1px solid #000000ff'
            }}
        >
            <Typography.Title level={4} style={{ margin: 0 }}>
                {isEditing ? (
                    <Input 
                        value={roleName} 
                        onChange={e => setRoleName(e.target.value)} 
                        style={{ width: 200 }}
                    />
                ) : (
                    name
                )}
            </Typography.Title>

            <div>Id - <strong>{id}</strong></div>
            <div>Тип - <strong>{typeText}</strong></div>

            <Space style={{ marginTop: 10, marginBottom: 10 }}>
                {!isEditing ? (
                    <>
                        <Button type="primary" onClick={handleEdit}>Изменить имя</Button>
                        <Button danger onClick={handleDelete}>Удалить</Button>
                        <Button type="dashed" onClick={showModal}>Добавить роль</Button>
                    </>
                ) : (
                    <>
                        <Button type="primary" disabled={roleName === name} onClick={handleSave}>Сохранить</Button>
                        <Button onClick={handleCancel}>Отменить</Button>
                    </>
                )}
            </Space>

            {childRoles.length > 0 && (
                <Button onClick={toggleCollapse} style={{ marginBottom: 10 }}>
                    {isCollapsed ? "Показать наследников" : "Свернуть наследников"}
                </Button>
            )}

            {!isCollapsed && childRoles.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                    <strong>Наследники:</strong>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {childRoles.map(child => (
                            <RoleCard 
                                key={child.id} 
                                id={child.id} 
                                name={child.name} 
                                type={child.type} 
                                childRoles={child.childRoles} 
                                level={level + 1} 
                                navigate={navigate}
                            />
                        ))}
                    </Space>
                </div>
            )}

            <Modal
                title="Создание роли"
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={[
                    <Button 
                        key="create" 
                        type="primary" 
                        disabled={!newRoleName} 
                        onClick={handleCreateRole}
                    >
                        Создать
                    </Button>
                ]}
            >
                <Input
                    placeholder="Введите имя роли"
                    value={newRoleName}
                    onChange={e => setNewRoleName(e.target.value)}
                />
            </Modal>
        </Card>
    );
}

export default RoleCard;
