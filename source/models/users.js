import prisma from "../prisma.js";

// for refecence checkout prisma CRUD support
// https://www.prisma.io/docs/concepts/components/prisma-client/crud

// Create
export async function add(data) {
  if (Array.isArray(data)) {
    const inserts = data.map((data) => prisma.user.create({ data }));

    return await prisma.$transaction(inserts);
  }

  return prisma.user.insertMany(data);
}

// Read
export async function find(query, filters = {}) {
  return prisma.user.findMany({ where: query, ...filters });
}

export async function getById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getBy(query) {
  return prisma.user.findFirst({ where: query });
}

// Update
export async function update(id, data) {
  return prisma.user.update({ where: { id }, data });
}

export async function updateBy(query, data) {
  return prisma.user.update({ where: query, data });
}

// Delete
export async function remove(id) {
  return prisma.user.delete({ where: { id } });
}

export async function removeBy(query) {
  return prisma.user.delete({ where: query });
}
