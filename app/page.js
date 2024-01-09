"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Box,
  Stack,
  StackDivider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useEffect, useState } from "react";

function Page() {
  const tempTodo = {};
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [todos, setTodos] = useState(
    JSON?.parse(localStorage.getItem("todos") || "[]")
  );

  function randomId() {
    return Math.round(Math.random() * 10_000_000);
  }

  function handleEditTodo(todoIndex) {
    setIsEditOpen(todoIndex);
    setCurrentTodo(todos[todoIndex]);
  }

  function handleDeleteTodo(todoIndex) {
    const tempTodos = Array.from(todos);
    tempTodos[todoIndex] = null;
    const result = tempTodos.filter((todo) => todo !== null);

    setTodos(result);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <main className="px-5 py-10">
      <Card>
        <CardHeader className="flex items-center">
          <Heading size="lg">To-do List</Heading>
          <Button
            className="ml-auto"
            colorScheme="blue"
            onClick={() => {
              setIsCreateOpen(true);
            }}
          >
            Add To-do
          </Button>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {todos.map((todo, index) => (
              <Box key={`todo-item-${index}`} className="flex">
                <Box className="flex flex-col">
                  <Heading size="md" textTransform="uppercase">
                    <Link href={`/todo/${todo?.id}`}>{todo?.name}</Link>
                  </Heading>
                  <Text fontSize="xs">
                    Deadline:{" "}
                    {new Date(todo?.endTime)?.toDateString() || todo?.endTime}
                  </Text>
                  <Text pt="2" fontSize="md">
                    {todo?.desc}
                  </Text>
                </Box>

                <Box className="ml-auto flex items-center">
                  <Button
                    className="ml-2"
                    colorScheme="yellow"
                    onClick={() => handleEditTodo(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="ml-2"
                    colorScheme="red"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>

      {/* MODEL EDIT TODO */}
      <Modal isOpen={isEditOpen !== false} onClose={() => setIsEditOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                defaultValue={currentTodo?.name}
                placeholder="Title"
                onInput={(e) => {
                  setCurrentTodo((todo) => ({
                    ...todo,
                    name: e.target.value,
                  }));
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                defaultValue={currentTodo?.desc}
                placeholder="Description"
                onInput={(e) => {
                  setCurrentTodo((todo) => ({
                    ...todo,
                    desc: e.target.value,
                  }));
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                defaultValue={currentTodo?.endTime}
                type="datetime-local"
                onInput={(e) => {
                  setCurrentTodo((todo) => ({
                    ...todo,
                    endTime: new Date(e.target.value),
                  }));
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                const newTodos = Array.from(todos);
                newTodos[isEditOpen] = currentTodo;
                setTodos(newTodos);
                setIsEditOpen(false);
              }}
            >
              Save
            </Button>
            <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* MODEL CREATE TODO */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah To-do List</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                onInput={(e) => {
                  setCurrentTodo((todo) => ({
                    ...todo,
                    name: e.target.value,
                  }));
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                onInput={(e) => {
                  setCurrentTodo((todo) => ({
                    ...todo,
                    desc: e.target.value,
                  }));
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                onInput={(e) => {
                  setCurrentTodo((todo) => ({
                    ...todo,
                    endTime: new Date(e.target.value).getTime(),
                  }));
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setTodos((todos) => [
                  ...todos,
                  {
                    id: randomId(),
                    ...currentTodo,
                  },
                ]);
                setIsCreateOpen(false);
                setCurrentTodo({});
              }}
            >
              Save
            </Button>
            <Button onClick={() => setIsCreateOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}

export default Page;
