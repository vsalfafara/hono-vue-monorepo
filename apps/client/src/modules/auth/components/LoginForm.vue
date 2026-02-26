<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your credentials</CardDescription>
    </CardHeader>
    <CardContent>
      <form id="login-form" @submit.prevent="form.handleSubmit">
        <FieldGroup>
          <form.Field name="email">
            <template #default="{ field }">
              <Field :data-invalid="isInvalid(field)">
                <FieldLabel :for="field.name"> Email </FieldLabel>
                <Input
                  type="email"
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
          <form.Field name="password">
            <template #default="{ field }">
              <Field :data-invalid="isInvalid(field)">
                <FieldLabel :for="field.name">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    :type="showPassword ? 'text' : 'password'"
                    :id="field.name"
                    :name="field.name"
                    :model-value="field.state.value"
                    :aria-invalid="isInvalid(field)"
                    @blur="field.handleBlur"
                    @input="field.handleChange($event.target.value)"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      size="icon-xs"
                      :aria-label="getShowPasswordLabel()"
                      :title="getShowPasswordLabel()"
                      @click="showPassword = !showPassword"
                    >
                      <Eye v-if="showPassword" />
                      <EyeClosed v-else />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError
                  v-if="isInvalid(field)"
                  :errors="field.state.meta.errors"
                />
              </Field>
            </template>
          </form.Field>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal" class="justify-end">
        <Button type="submit" form="login-form"> Login </Button>
      </Field>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuthStore } from "@/stores/auth.store";
import { isInvalid } from "@/utils/form.utils";
import { useForm } from "@tanstack/vue-form";
import { Eye, EyeClosed } from "lucide-vue-next";
import { capitalize, ref } from "vue";
import { toast } from "vue-sonner";
import { z } from "zod";

const showPassword = ref<boolean>(false);
const authStore = useAuthStore();

const formSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => authStore.login(value),
});

function getShowPasswordLabel() {
  return showPassword.value ? "Hide Password" : "Show Password";
}
</script>
