<template>
  <Dialog
    :open="dialogState"
    @update:open="(state: boolean) => (dialogState = state)"
  >
    <DialogTrigger as-child>
      <Button size="icon-xs" variant="warning"> <Pencil /> </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>Fill the form below</DialogDescription>
      </DialogHeader>
      <form id="create-task-form" @submit.prevent="form.handleSubmit">
        <FieldGroup>
          <form.Field name="title">
            <template #default="{ field }">
              <Field :data-invalid="isInvalid(field)">
                <FieldLabel :for="field.name"> Title </FieldLabel>
                <Input
                  type="text"
                  :id="field.name"
                  :name="field.name"
                  :model-value="field.state.value"
                  :aria-invalid="isInvalid(field)"
                  @blur="field.handleBlur"
                  @input="field.handleChange($event.target.value)"
                />
                <FieldError
                  v-if="isInvalid(field)"
                  :errors="field.state.meta.errors"
                />
              </Field>
            </template>
          </form.Field>
          <form.Field name="description">
            <template #default="{ field }">
              <Field :data-invalid="isInvalid(field)">
                <FieldLabel :for="field.name">Description</FieldLabel>
                <Input
                  type="text"
                  :id="field.name"
                  :name="field.name"
                  :model-value="field.state.value"
                  :aria-invalid="isInvalid(field)"
                  @blur="field.handleBlur"
                  @input="field.handleChange($event.target.value)"
                />
                <FieldError
                  v-if="isInvalid(field)"
                  :errors="field.state.meta.errors"
                />
              </Field>
            </template>
          </form.Field>
        </FieldGroup>
      </form>
      <DialogFooter>
        <Field orientation="horizontal" class="justify-end">
          <Button type="submit" form="create-task-form" :disabled="loading">
            {{ loading ? "Updating task" : "Submit" }}
            <Loader2 v-if="loading" class="ml-2 h-4 w-4 animate-spin" />
          </Button>
        </Field>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { isInvalid } from "@/utils/form.utils";
import { useForm } from "@tanstack/vue-form";
import z from "zod";
import { useTasksStore } from "../tasks.store";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { Loader2, Pencil } from "lucide-vue-next";
import { apiClient, useApi } from "@/lib/api.utils";
import { toast } from "vue-sonner";
import type { Task } from "../tasks.types";

type EditTaskDialog = {
  id: string;
  title: string;
  description: string;
};

type EditTaskEmits = {
  (e: "refresh"): void;
};

const { id, title, description = "" } = defineProps<EditTaskDialog>();
const emit = defineEmits<EditTaskEmits>();

const { loading, execute } = useApi();
const tasksStore = useTasksStore();
const dialogState = ref<boolean>(false);

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
});

const form = useForm({
  defaultValues: {
    title,
    description,
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    const data = {
      param: { id },
      json: value,
    };
    const response = await execute(apiClient.tasks[":id"].$put, data);
    toast.success(`Task Updated: ${response.title}`);
    dialogState.value = false;
    await tasksStore.fetchData();
  },
});
</script>
