print "Clearing users & projects... "

User.destroy_all # Destroys all projects as well

puts "Done"

print "Clearing comments & likes... "

Comment.destroy_all # Destroys all likes & replies as well

puts "Done"

puts "Seeding users... "

admin = User.create!({
  email: "admin@gmail.com",
  first_name: "Jerry",
  last_name: "Seinfeld",
  password: "123456",
  admin: true
})

user1 = User.create!({
  email: "george@gmail.com",
  first_name: "George",
  last_name: "Constanza",
  password: "123456" 
})

user2 = User.create!({
  email: "elaine@gmail.com",
  first_name: "Elaine",
  last_name: "Benes",
  password: "123456"
})

10.times do 
  name = rand > 0.5 ? Faker::StarTrek.character : Faker::StarTrek.villain
  User.create({
    email: name.chars.join("").downcase + "@gmail.com",
    first_name: name.split(" ")[0],
    last_name: name.split(" ")[1] || "StarTrek" ,
    password: "123456"
  })
end

puts "Done"

print "Seeding prjects... "

20.times do
  status = Project::Statuses.sample
  Project.create!({
    user: User.all.sample,
    name: Faker::Hipster.sentence,
    description: Faker::Hipster.paragraphs(4).join(" "),
    private: Faker::Boolean.boolean(0.2),
    estimated_level_of_effort: rand(1..10),
    actual_level_of_effort: status == "completed" ? rand(1..10) : nil,
    status: status
  })  
end

puts "Done"

print "Seeding comments... "

Comment.create!({
  user: User.all.sample,
  project: Project.all.sample,
  content: Faker::Seinfeld.quote
})

200.times do
  project = Project.where(private: false).sample
  if rand > 0.5 && Comment.where(project: project).any?
    parent = Comment.where(project: project).sample
  else
    parent = nil
  end
  Comment.create!({
    user: User.all.sample,
    project: project,
    content: Faker::Seinfeld.quote,
    parent: parent
  })
end

puts "Done"

print "Seeding likes... "

500.times do
  Like.create({
    user: User.all.sample,
    comment: Comment.all.sample
  })
end

puts "Done"